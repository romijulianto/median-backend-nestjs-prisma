import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // TODO:approach connect prisma client as soon as the module initialize
  async onModuleInit() {
    await this.$connect();
  }

  // TODO:ensure prisma client is prperly closed when app exit
  async enableShutdownHooks(app: INestApplication) {
    const prisma = this as any;
    prisma.$on('beforeExit', async () => {
      await prisma.$disconnect();
      await app.close();
    });
  }
}
