import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { User } from './user.entity';
import { Order } from './order.entity';
import { CreateUpdateColumn } from '../../common/create-update.entity';

@Entity({ name: 'customers' })
export class Customer extends CreateUpdateColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar' })
  phone: string;

  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
