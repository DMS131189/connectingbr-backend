import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  rating: number; // 1-5 stars

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ nullable: false })
  reviewerId: number; // User who wrote the review

  @Column({ nullable: false })
  professionalId: number; // User being reviewed

  @ManyToOne('User', { nullable: false })
  @JoinColumn({ name: 'reviewerId' })
  reviewer: any;

  @ManyToOne('User', { nullable: false })
  @JoinColumn({ name: 'professionalId' })
  professional: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 