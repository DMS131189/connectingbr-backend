import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 255, nullable: true })
  icon: string; // URL or icon class name

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  order: number; // For ordering categories

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationship with users (many-to-many would be better, but keeping it simple for now)
  @OneToMany(() => User, user => user.category)
  users: User[];
} 