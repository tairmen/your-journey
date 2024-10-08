import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Photo } from './photo.entity';
import { Status } from './enums/status.enum';
import { IsNotEmpty, IsNumberString, Length } from 'class-validator';

@Entity()
export class Feedback {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    @IsNotEmpty()
    @IsNumberString()
    @Length(12, 12)
    phone: string;

    @Column('text')
    comment: string;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.NO_PAYMENT
    })
    status: Status;

    @Column({
        nullable: true
    })
    sku_name: string;

    @Column({ select: false })
    code: string;

    @Column()
    link: string;

    @Column()
    design: number;

    @Column()
    flavor: number;

    @Column({
        nullable: true
    })
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