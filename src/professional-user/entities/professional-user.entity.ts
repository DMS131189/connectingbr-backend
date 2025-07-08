import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ProfessionalUser {
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

  @Column({ name: 'business_name', length: 100 })
  businessName: string;

  @Column({ name: 'business_description', type: 'text' })
  businessDescription: string;

  @Column({ type: 'text', nullable: true })
  photos: string; // JSON string array of photo URLs

  @Column({ length: 255, nullable: true })
  website: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 