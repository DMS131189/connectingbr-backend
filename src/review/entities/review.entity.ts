import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Min, Max } from 'class-validator';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  @Min(1)
  @Max(5)
  rating: number; // 1-5 stars

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ nullable: false })
  reviewerId: number; // User who wrote the review

  @Column({ nullable: false })
  professionalId: number; // User being reviewed

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'reviewerId' })
  reviewer: User;

  @ManyToOne(() => User, user => user.receivedReviews, { nullable: false })
  @JoinColumn({ name: 'professionalId' })
  professional: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 