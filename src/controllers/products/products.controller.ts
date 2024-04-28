import { CreateProductDto, UpdateProductDto } from '@dtos/product.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from '@services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // Get: Products list
  @Get()
  getProductList() {
    const products = {
      products: this.productsService.all(),
    };

    return products;
  }

  // Get: Product getting productId as path parameter
  @Get(':productId')
  getProductById(@Param('productId', ParseIntPipe) productId: number) {
    const product = {
      product: this.productsService.find(productId),
    };

    return product;
  }

  // Get: Product getting productName as path parameter
  @Get('name/:productName')
  getProductByName(@Param('productName') productName: string) {
    const product = {
      product: this.productsService.findByName(productName),
    };

    return product;
  }

  // Post: Create a new product getting dataProduct as body parameter
  @Post()
  createProduct(@Body() dataProduct: CreateProductDto) {
    const product = {
      product: this.productsService.create(dataProduct),
    };

    return product;
  }

  // Put: Update a product getting productId as path parameter and updatesProduct as body parameter
  @Put(':productId')
  updateProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() updatesProduct: UpdateProductDto,
  ) {
    const product = {
      product: this.productsService.update(productId, updatesProduct),
    };

    return product;
  }

  // Delete: Delete a product getting productId as path parameter
  @Delete(':productId')
  deleteProduct(@Param('productId', ParseIntPipe) productId: number) {
    const product = {
      product: this.productsService.delete(productId),
    };

    return product;
  }
}
