import { CreateCategoryDto } from '@dtos/category.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from '@services/categories/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  // Get: Categories list
  @Get()
  getCategoriesList() {
    const categories = {
      categories: this.categoriesService.all(),
    };

    return categories;
  }

  // Get: Category getting categoryId as path parameter
  @Get(':categoryId')
  getCategoryById(@Param('categoryId', ParseIntPipe) categoryId: number) {
    const category = {
      category: this.categoriesService.find(categoryId),
    };

    return category;
  }

  // Get: Category getting categoryName as path parameter
  @Get('name/:categoryName')
  getCategoryByName(@Param('categoryName') categoryName: string) {
    const category = {
      category: this.categoriesService.findByName(categoryName),
    };

    return category;
  }

  // Post: Create a new category getting dataCategory as body parameter
  @Post()
  createCategory(@Body() dataCategory: CreateCategoryDto) {
    const category = {
      category: this.categoriesService.create(dataCategory),
    };

    return category;
  }

  // Put: Update a category getting categoryId as path parameter and updatesCategory as body parameter
  @Put(':categoryId')
  updateCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() updatesCategory: CreateCategoryDto,
  ) {
    const category = {
      category: this.categoriesService.update(categoryId, updatesCategory),
    };

    return category;
  }

  // Delete: Delete a category getting categoryId as path parameter
  @Delete(':categoryId')
  deleteCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    const category = {
      category: this.categoriesService.delete(categoryId),
    };

    return category;
  }
}
