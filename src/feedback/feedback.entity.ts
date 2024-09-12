import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Photo } from './photo.entity';

@Entity()
export class Feedback {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    phone: string;

    @Column('text')
    comment: string;

    @Column()
    replenishment: number; // 0 if no replenishment, 1 if yes

    @Column()
    sku_name: string;

    @Column()
    link: string;

    @Column()
    design: number;

    @Column()
    flavor: number;

    @Column()
    filter: number;

    @Column('text')
    factory: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @OneToMany(() => Photo, (photo) => photo.feedback)
    photos: Photo[];
}