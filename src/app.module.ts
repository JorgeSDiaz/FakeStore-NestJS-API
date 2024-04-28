import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products/products.controller';
import { ProductsService } from './services/products/products.service';
import { CategoriesService } from './services/categories/categories.service';
import { CategoriesController } from './controllers/categories/categories.controller';
import { BrandsService } from './services/brands/brands.service';
import { BrandsController } from './controllers/brands/brands.controller';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, CategoriesController, BrandsController],
  providers: [AppService, ProductsService, CategoriesService, BrandsService],
})
export class AppModule {}
