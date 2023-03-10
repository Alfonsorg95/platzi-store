import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
//import { Order } from '../entities/order.entity';

import { ProductsService } from 'src/products/services/products.service';
import { CustomersService } from './customers.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    @InjectRepository(User) private usersRepo: Repository<User>,
    private customerService: CustomersService,
  ) {}

  findAll() {
    return this.usersRepo.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    const user = await this.usersRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = this.usersRepo.create(data);
    if (data.customerId) {
      const customer = await this.customerService.findOne(data.customerId);
      newUser.customer = customer;
    }
    return this.usersRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.findOne(id);
    this.usersRepo.merge(user, changes);
    return this.usersRepo.save(user);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.usersRepo.delete(id);
  }

  async getOrderByUser(id: number) {
    const user = await this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
