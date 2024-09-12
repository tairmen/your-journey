import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Feedback } from './feedback.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Feedback, (feedback) => feedback.photos, { onDelete: 'CASCADE' })
  feedback: Feedback;
}