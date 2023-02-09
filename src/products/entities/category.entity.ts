import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Product } from './product.entity';
import { CreateUpdateColumn } from '../../common/create-update.entity';

@Entity({ name: 'categories' })
export class Category extends CreateUpdateColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @ManyToMany(() => Product, (product) => product.categories)
  @JoinTable({
    name: 'products_categories',
    joinColumn: {
      name: 'category_id',
    },
    inverseJoinColumn: {
      name: 'product_id',
    },
  })
  products: Product[];
}
