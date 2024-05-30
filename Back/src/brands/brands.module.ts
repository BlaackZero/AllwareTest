import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService, PrismaService]
})
export class BrandsModule {}
