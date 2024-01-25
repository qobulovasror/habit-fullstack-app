import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import IHabit from '../model/Habit.model';
import { UserEntity } from './User.entity';
import { TrackEntity } from './Track.entity';

@Entity()
export class HabitEntity implements IHabit {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    name!: string;

    @Column({nullable: true})
    description!: string;
    
    @Column({default: new Date().toDateString()})
    createdAt!: string;
    
    @Column()
    frequency!: number;
    
    @Column({nullable: true})
    amount!: number;
    
    @Column({nullable: true})
    amountType!: string;
    
    @Column({default: false})
    change!: boolean;
    
    @Column({default: 0})
    changeValue!: number;
    
    @Column({nullable: true})
    target!: number;
    
    @Column({default: false})
    reminder!: boolean;
    
    @Column({nullable: true})
    reminderTime!: string;

    @ManyToOne(() => UserEntity, (user) => user.habit)
    user: string;

    @OneToMany(() => TrackEntity, (track) => track.habit)
    track: TrackEntity[];
}