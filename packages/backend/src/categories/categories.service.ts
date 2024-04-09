import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  public async findAll(): Promise<string[]> {
    const products = await this.productRepository.find();

    return [...new Set(products.map((p) => p.category))];
  }

  public async findByCategoryName(name: string): Promise<Product[]> {
    return await this.productRepository.find({
      where: { category: Like(`%${name}%`) },
    });
  }
}
