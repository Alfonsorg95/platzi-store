import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderProduct } from '../entities/order-product.entity';
import { Order } from '../entities/order.entity';
import { Product } from 'src/products/entities/product.entity';

import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/orderitem.dto';

@Injectable()
export class OrderitemsService {
  constructor(
    @InjectRepository(Order) private ordersRepo: Repository<Order>,
    @InjectRepository(OrderProduct)
    private orderitemsRepo: Repository<OrderProduct>,
    @InjectRepository(Product) private productsRepo: Repository<Product>,
  ) {}

  async findOne(id: number) {
    const orderItem = await this.orderitemsRepo.findOne({
      where: { id: id },
      relations: {
        product: true,
      },
    });
    if (!orderItem) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return orderItem;
  }

  async create(data: CreateOrderItemDto) {
    const order = await this.ordersRepo.findOneBy({ id: data.orderId });
    const product = await this.productsRepo.findOneBy({ id: data.productId });
    const item = new OrderProduct();
    item.order = order;
    item.product = product;
    item.quantity = data.quantity;
    return this.orderitemsRepo.save(item);
  }

  async update(id: number, changes: UpdateOrderItemDto) {
    const item = await this.orderitemsRepo.findOneBy({ id: id });
    item.quantity = changes.quantity;
    return this.orderitemsRepo.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    if (!item) {
      throw new NotFoundException(`Item id: ${id} not found`);
    }
    return this.ordersRepo.delete(id);
  }
}
