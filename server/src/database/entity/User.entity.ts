import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
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
  createdAt: string;
}