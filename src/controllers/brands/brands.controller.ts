import { CreateBrandDto, UpdateBrandDto } from '@dtos/brand.dto';
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
import { BrandsService } from '@services/brands/brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private BrandService: BrandsService) {}

  // Get: Brands list
  @Get()
  getBrandList() {
    const brands = {
      brands: this.BrandService.all(),
    };

    return brands;
  }

  // Get: Brand getting brandId as path parameter
  @Get(':brandId')
  getBrandById(@Param('brandId', ParseIntPipe) brandId: number) {
    const brand = {
      brand: this.BrandService.find(brandId),
    };

    return brand;
  }

  // Post: Create a new brand getting dataBrand as body parameter
  @Post()
  createBrand(@Body() dataBrand: CreateBrandDto) {
    const brand = {
      brand: this.BrandService.create(dataBrand),
    };

    return brand;
  }

  // Put: Update a brand getting brandId as path parameter and updatesBrand as body parameter
  @Put(':brandId')
  updateBrand(
    @Param('brandId', ParseIntPipe) brandId: number,
    @Body() updatesBrand: UpdateBrandDto,
  ) {
    const brand = {
      brand: this.BrandService.update(brandId, updatesBrand),
    };

    return brand;
  }

  // Delete: Remove a brand getting brandId as path parameter
  @Delete(':brandId')
  deleteBrand(@Param('brandId', ParseIntPipe) brandId: number) {
    const brand = {
      brand: this.BrandService.delete(brandId),
    };

    return brand;
  }
}
