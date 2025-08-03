import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ name: 'categoryId' })
  categoryId: number;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column('float')
  rating: number;

  @Column()
  provider: string;
}
