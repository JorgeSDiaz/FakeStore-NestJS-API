import { CreateBrandDto, UpdateBrandDto } from '@dtos/brand.dto';
import { Brand } from '@models/brand';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class BrandsService {
  brands: Brand[] = [
    {
      id: 1,
      name: 'Brand 1',
      description: 'Brand 1 description',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Brand 2',
      description: 'Brand 2 description',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // Return brands list
  all(): Brand[] {
    return this.brands;
  }

  // Return a brand by id
  find(id: number): Brand {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not was found`);
    }

    return brand;
  }

  findBrandByName(name: string): Brand {
    return this.brands.find((brand) => brand.name === name);
  }

  // Create a new brand
  create(dataBrand: CreateBrandDto): Brand {
    const brand = this.findBrandByName(dataBrand.name);
    if (brand) {
      throw new NotFoundException(
        `Brand with name ${dataBrand.name} already exists`,
      );
    }

    const newBrand = {
      id: this.brands.length + 1,
      ...dataBrand,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.brands.push(newBrand);

    return newBrand;
  }

  // Update a brand by id
  update(id: number, updatesProduct: UpdateBrandDto): Brand {
    const brand = this.find(id);
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not was found`);
    }

    const updatedBrand: Brand = {
      ...brand,
      ...updatesProduct,
      updatedAt: new Date(),
    };
    this.brands = this.brands.map((brand) =>
      brand.id === id ? updatedBrand : brand,
    );

    return updatedBrand;
  }

  // Delete a brand by id
  delete(id: number): Brand {
    const brand = this.find(id);
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not was found`);
    }

    this.brands = this.brands.filter((brand) => brand.id !== id);

    return brand;
  }
}
