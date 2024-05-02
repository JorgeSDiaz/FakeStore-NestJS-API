import { CreateCustomerDto, UpdateCustomerDto } from '@dtos/customer.dto';
import { Customer } from '@models/customer';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class CustomersService {
  customers: Customer[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@exmaple.com',
      phone: '1234567890',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postalCode: '10001',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      phone: '0987654321',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      postalCode: '90001',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // Returns customers list
  all(): Customer[] {
    return this.customers;
  }

  // Returns a customer by id
  find(id: number): Customer {
    const customer = this.customers.find((customer) => customer.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not was found`);
    }

    return customer;
  }

  findCustomerByName(name: string): Customer {
    return this.customers.find((customer) => customer.name === name);
  }

  // Create a new customer
  create(dataCustomer: CreateCustomerDto): Customer {
    const customer = this.findCustomerByName(dataCustomer.name);
    if (customer) {
      throw new ConflictException(
        `Customer with name ${customer.name} already exists`,
      );
    }

    const newCustomer: Customer = {
      id: this.customers.length + 1,
      ...dataCustomer,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.customers.push(newCustomer);

    return newCustomer;
  }

  // Update a customer by id
  update(id: number, updatesCustomer: UpdateCustomerDto): Customer {
    const customer = this.find(id);
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not was found`);
    }

    const updatedCustomer = { ...customer, ...updatesCustomer };
    this.customers = this.customers.map((customer) =>
      customer.id === id ? updatedCustomer : customer,
    );

    return updatedCustomer;
  }

  // Remove a customer by id
  remove(id: number): Customer {
    const customer = this.find(id);
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not was found`);
    }

    this.customers = this.customers.filter((customer) => customer.id !== id);

    return customer;
  }
}
