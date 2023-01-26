import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'Customers' })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar' })
  phone: string;
}
