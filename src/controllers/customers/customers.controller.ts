import { CreateCustomerDto, UpdateCustomerDto } from '@dtos/customer.dto';
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
import { CustomersService } from '@services/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customersServices: CustomersService) {}

  // Get: Customers list
  @Get()
  getCustomersList() {
    const customers = {
      customers: this.customersServices.all(),
    };

    return customers;
  }

  // Get: Customer getting customerId as path parameter
  @Get(':customerId')
  getCustomerById(@Param('customerId', ParseIntPipe) customerId: number) {
    const customer = {
      customer: this.customersServices.find(customerId),
    };

    return customer;
  }

  // Post: Create a new customer getting dataCustomer as body parameter
  @Post()
  createCustomer(@Body() dataCustomer: CreateCustomerDto) {
    const customer = {
      customer: this.customersServices.create(dataCustomer),
    };

    return customer;
  }

  // Put: Update a customer getting customerId as path parameter and updatesCustomer as body parameter
  @Put(':customerId')
  updateCustomer(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() updatesCustomer: UpdateCustomerDto,
  ) {
    const customer = {
      customer: this.customersServices.update(customerId, updatesCustomer),
    };

    return customer;
  }

  // Delete: Remove a customer getting customerId as path parameter
  @Delete(':customerId')
  deleteCustomer(@Param('customerId', ParseIntPipe) customerId: number) {
    const customer = {
      customer: this.customersServices.remove(customerId),
    };

    return customer;
  }
}
