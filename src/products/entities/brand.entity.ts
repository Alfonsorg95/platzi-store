import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

import { Product } from './product.entity';
import { CreateUpdateColumn } from '../../common/create-update.entity';

@Entity({ name: 'brands' })
export class Brand extends CreateUpdateColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar' })
  image: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
