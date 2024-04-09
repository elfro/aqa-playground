import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [CategoriesController],
  providers: [CategoriesService, ConfigService, JwtService, JwtAuthGuard],
})
export class CategoriesModule {}
