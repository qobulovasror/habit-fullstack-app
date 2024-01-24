import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import IHabit from '../model/Habit.model';

@Entity()
export class HabitEntity implements IHabit {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    user_id!: number;
    
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
}