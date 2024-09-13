import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Photo } from './photo.entity';

export enum Status {
    NO_PAYMENT = 'NO_PAYMENT',
    PENDING_OTP = 'PENDING_OTP',
    PAYMENT_SENT = 'PAYMENT_SENT',
}

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

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.NO_PAYMENT
    })
    status: Status;

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