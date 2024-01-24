import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import ITrack from "../model/Track.model";

@Entity()
export class TrackEntity implements ITrack {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    habit_id: number;

    @Column({default: new Date().toDateString()})
    time: string;

    @Column({default: 100})
    quatity: number;
}