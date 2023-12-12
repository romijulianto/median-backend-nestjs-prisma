import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import {
  ApiResponse,
  ApiResponseCustomMessage,
} from 'src/common/dto/api-response.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Post users', description: 'Post new user' })
  @ApiCreatedResponse({ type: UserEntity })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponse<any>> {
    try {
      const data = new UserEntity(
        await this.usersService.create(createUserDto),
      );
      return new ApiResponse(HttpStatus.OK, 'success', data);
    } catch (error) {
      return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Return all users',
  })
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll(): Promise<ApiResponse<any>> {
    try {
      const users = await this.usersService.findAll();
      const data = users.map((user) => new UserEntity(user));
      return new ApiResponse(HttpStatus.OK, 'success', data);
    } catch (error) {
      return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get an user by ID',
    description: 'Return a specific user by ID',
  })
  @ApiOkResponse({ type: UserEntity })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<any>> {
    try {
      const data = new UserEntity(await this.usersService.findOne(id));
      if (!data) {
        throw new NotFoundException(
          `${ApiResponseCustomMessage.USERS_NOT_FOUND} ${id}`,
        ).getResponse();
      }
      return new ApiResponse(HttpStatus.OK, 'success', data);
    } catch (error) {
      throw new NotFoundException(
        `${ApiResponseCustomMessage.USERS_NOT_FOUND} ${id}`,
      ).getResponse();
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Patch an user by ID',
    description: 'Return update user by ID',
  })
  @ApiCreatedResponse({ type: UserEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<any>> {
    try {
      const data = new UserEntity(
        await this.usersService.update(id, updateUserDto),
      );
      if (!data) {
        throw new NotFoundException(
          `${ApiResponseCustomMessage.USERS_NOT_FOUND} ${id}`,
        ).getResponse();
      }
      return new ApiResponse(
        HttpStatus.OK,
        `${ApiResponseCustomMessage.USERS_UPDATE} ${id}`,
        data,
      );
    } catch (error) {
      throw new NotFoundException(
        `${ApiResponseCustomMessage.USERS_NOT_FOUND} ${id}`,
      ).getResponse();
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete an user by ID',
    description: 'Return delete user by ID',
  })
  @ApiOkResponse({ type: UserEntity })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<any>> {
    try {
      const data = new UserEntity(await this.usersService.remove(id));
      if (!data) {
        throw new NotFoundException(
          `${ApiResponseCustomMessage.USERS_NOT_FOUND} ${id}`,
        ).getResponse();
      }
      return new ApiResponse(
        HttpStatus.OK,
        `${ApiResponseCustomMessage.USERS_DELETE} ${id}`,
      );
    } catch (error) {
      throw new NotFoundException(
        `${ApiResponseCustomMessage.USERS_NOT_FOUND} ${id}`,
      ).getResponse();
    }
  }
}
