import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

import { User } from './user.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity({ name: 'Orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  date: Date;
  user: User;
  products: Product[];
}
