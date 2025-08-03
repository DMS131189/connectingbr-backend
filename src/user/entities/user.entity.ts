import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Service } from '../../service/entities/service.entity';
import { UserRole } from '../enums/user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  surname: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT
  })
  role: UserRole;

  @Column({ name: 'business_name', length: 100, nullable: true })
  businessName: string;

  @Column({ name: 'business_description', type: 'text', nullable: true })
  businessDescription: string;

  @Column({ type: 'text', nullable: true })
  photos: string; // JSON string array of photo URLs

  @Column({ length: 255, nullable: true })
  website: string;

  @OneToMany(() => Service, service => service.provider)
  services: Service[];

  @Column({ nullable: true })
  categoryId: number;

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
