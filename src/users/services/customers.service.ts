import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customersRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.customersRepo.find();
  }

  async findOne(id: number) {
    const customer = await this.customersRepo.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  create(data: CreateCustomerDto) {
    const newCustomer = this.customersRepo.create(data);
    return this.customersRepo.save(newCustomer);
  }

  async update(id: number, changes: UpdateCustomerDto) {
    const customer = await this.findOne(id);
    this.customersRepo.merge(customer, changes);
    return this.customersRepo.save(customer);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.customersRepo.delete(id);
  }
}
