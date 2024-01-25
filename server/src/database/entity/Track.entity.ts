import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import ITrack from "../model/Track.model";
import { HabitEntity } from "./Habit.entity";

@Entity()
export class TrackEntity implements ITrack {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: new Date().toDateString()})
    time: string;

    @Column({default: 100})
    quatity: number;

    @ManyToOne(() => HabitEntity, (habit) => habit.tracks)
    habit: HabitEntity;
}