import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { HabitEntity } from './Habit.entity';
import IUser from '../model/User.model';

@Entity()
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({unique: true})
  email!: string;
  
  @Column()
  password!: string;
  
  @Column({default: new Date().toDateString()})
  createdAt!: string;

  @Column({default: "user"})
  role!: string;

  @OneToMany(() => HabitEntity, (habit) => habit.user)
  habit: HabitEntity[];
}