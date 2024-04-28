import { Category } from '@models/category';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class CategoriesService {
  categories: Category[] = [
    {
      id: 1,
      name: 'Category 1',
      description: 'Category 1 description',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Category 2',
      description: 'Category 2 description',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // Return categories list
  all(): Category[] {
    return this.categories;
  }

  // Return a category by id
  find(id: number): Category {
    const category = this.categories.find((category) => category.id === id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not was found`);
    }

    return category;
  }

  findCategoryByName(name: string): Category {
    return this.categories.find((category) => category.name === name);
  }

  // find category by name
  findByName(name: string): Category {
    const category = this.findCategoryByName(name);
    if (!category) {
      throw new NotFoundException(`Category with name ${name} not was found`);
    }

    return category;
  }

  // Create a new category
  create(dataCategory: Category): Category {
    const category = this.findCategoryByName(dataCategory.name);
    if (category) {
      throw new ConflictException(
        `Category with name ${dataCategory.name} already exists`,
      );
    }

    const newCategory: Category = {
      id: this.categories.length + 1,
      ...dataCategory,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.categories.push(newCategory);

    return dataCategory;
  }

  // Update a category
  update(id: number, updatesCategory: Category): Category {
    const category = this.find(id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not was found`);
    }

    const updatedCategory = {
      ...category,
      ...updatesCategory,
      updatedAt: new Date(),
    };
    this.categories = this.categories.map((category) =>
      category.id === id ? updatedCategory : category,
    );

    return updatedCategory;
  }

  // Delete a category
  delete(id: number): void {
    const category = this.find(id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not was found`);
    }

    this.categories = this.categories.filter((category) => category.id !== id);
  }
}
