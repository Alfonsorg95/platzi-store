import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { Customer } from './entities/customer.entity';
import { Order } from './entities/order.entity';
import { OrderProduct } from './entities/order-product.entity';

import { ProductsModule } from 'src/products/products.module';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { OrderitemsController } from './controllers/orderitems.controller';
import { OrderitemsService } from './services/orderitems.service';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Customer, Order, OrderProduct]),
  ],
  controllers: [UsersController, CustomersController, OrdersController, OrderitemsController],
  providers: [UsersService, CustomersService, OrdersService, OrderitemsService],
})
export class UsersModule {}
