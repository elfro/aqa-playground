import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Message } from '../common/message';
import { CreateProductDto } from './dto/create.product.dto';

@Injectable()
export class ProductsService {
  @Inject()
  protected readonly logger: Logger;

  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  public async create(productDto: CreateProductDto): Promise<Product> {
    const productInDb = await this.productRepository.findOne({
      where: { title: productDto.title },
    });
    if (productInDb) {
      throw new ConflictException(Message.PRODUCT_EXISTS);
    }

    try {
      const product = await this.productRepository.create(productDto);
      return this.productRepository.save(product);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(Message.SOMETHING_WENT_WRONG);
    }
  }

  public async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  public async findById(id: number): Promise<Product> {
    const product = this.productRepository.findOne({
      where: { id: id },
    });

    if (!product) {
      throw new NotFoundException(`Product with such id [${id}] not found`);
    }

    return product;
  }

  public async deleteAll(): Promise<void> {
    return this.productRepository.clear();
  }
}
