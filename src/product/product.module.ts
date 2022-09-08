import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ProductResolver, ProductService, PrismaService], // need for the dependency injection
})
export class ProductModule {}
