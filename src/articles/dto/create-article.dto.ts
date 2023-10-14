import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty() // TODO: automatically document it in Swagger
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  body: string;

  @ApiProperty({ required: false, default: false })
  published?: boolean = false;
}
