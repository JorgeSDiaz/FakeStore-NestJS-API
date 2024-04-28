import { CreateProductDto, UpdateProductDto } from '@dtos/product.dto';
import { Product } from '@models/product';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ProductsService {
  products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      description: 'Description 1',
      imageUrl: 'https://via.placeholder.com/150',
      categoryId: 1,
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      description: 'Description 2',
      imageUrl: 'https://via.placeholder.com/150',
      categoryId: 2,
    },
  ];

  // Return products list
  all(): Product[] {
    return this.products;
  }

  // Return a product by id
  find(id: number): Product {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not was found`);
    }

    return product;
  }

  findProductByName(name: string): Product {
    return this.products.find((product) => product.name === name);
  }

  // find product by name
  findByName(name: string): Product {
    const product = this.findProductByName(name);
    if (!product) {
      throw new NotFoundException(`Product with name ${name} not was found`);
    }

    return product;
  }

  // Create a new product
  create(dataProduct: CreateProductDto): Product {
    const product = this.findProductByName(dataProduct.name);
    if (product) {
      throw new ConflictException(
        `Product with name ${dataProduct.name} already exists`,
      );
    }

    const newProduct = {
      id: this.products.length + 1,
      ...dataProduct,
    };
    this.products.push(newProduct);

    return newProduct;
  }

  // Update a product by id
  update(id: number, updatesProduct: UpdateProductDto): Product {
    const product = this.find(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not was found`);
    }

    const updatedProduct = { ...product, ...updatesProduct };
    this.products = this.products.map((product) =>
      product.id === id ? updatedProduct : product,
    );

    return updatedProduct;
  }

  // Delete a product by id
  delete(id: number): Product {
    const product = this.find(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not was found`);
    }

    this.products = this.products.filter((product) => product.id !== id);

    return product;
  }
}
