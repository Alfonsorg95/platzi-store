import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'Brands' })
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  image: string;
}
