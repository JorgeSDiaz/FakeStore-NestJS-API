import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products/products.controller';
import { ProductsService } from './services/products/products.service';
import { CategoriesService } from './services/categories/categories.service';
import { CategoriesController } from './controllers/categories/categories.controller';
import { BrandsService } from './services/brands/brands.service';
import { BrandsController } from './controllers/brands/brands.controller';
import { CustomersController } from './controllers/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, CategoriesController, BrandsController, CustomersController],
  providers: [AppService, ProductsService, CategoriesService, BrandsService, CustomersService],
})
export class AppModule {}
