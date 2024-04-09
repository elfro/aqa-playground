import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { Route } from '../common/route';
import { Tag } from '../common/tag';
import { CategoriesService } from './categories.service';
import { Product } from '../products/entities/product.entity';

@ApiBearerAuth()
@Controller(Route.CATEGORIES)
@ApiTags(Tag.CATEGORIES)
export class CategoriesController {
  @Inject()
  private categoriesService: CategoriesService;

  @Get('')
  @ApiOkResponse({ type: [String] })
  @ApiOperation({ summary: 'Fetch all products categories' })
  public async findAllCategories(): Promise<string[]> {
    return this.categoriesService.findAll();
  }

  @Get(':name')
  @ApiOkResponse({ type: [Product] })
  @ApiOperation({ summary: 'Fetch all products by category name' })
  public async findByCategoryName(@Param('name') name: string): Promise<Product[]> {
    return this.categoriesService.findByCategoryName(name);
  }
}
