import { Request, Response, NextFunction } from "express";
import { useTypeORM } from "../database/typeorm";
import { HabitEntity } from "../database/entity/Habit.entity";
import { TrackEntity } from "../database/entity/Track.entity";
import { CustomError } from "../middlewares/customError";
import { addTrackValidator, updateTrackValidator } from "../validations/track.validator";

//get all tracks for admin
async function getAllTracksForAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const tracks = await useTypeORM(TrackEntity).find()
        res.json(tracks);
    } catch (error) {
        console.log(error);
        next(error)
    }
}

//get tracks
async function getAllTracks(req: Request, res: Response, next: NextFunction) {
    try {
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        const userId = req.user.id; 
        const habitId = req.params.id      
        if(!userId || !habitId)
            throw new CustomError( 400, 'Missing habit ID');
        const habit = await useTypeORM(HabitEntity).findOne({where: { user: userId, id: habitId },});
        if(!habit)
            throw new CustomError( 404, 'habit not found');
        const tracks = await useTypeORM(TrackEntity).find({where: {habit: habit.id}})        
        res.json(tracks);
    } catch (error) {
        console.log(error);
        next(error)
    }
}

//add tracks
async function addTrack(req: Request, res: Response, next: NextFunction) {
    try {
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        const userId = req.user.id; 
        const { error } = await addTrackValidator(req.body);
        if (error)
            throw new CustomError(400, error?.details[0].message);
        const habitId = req.body.habitId;
        if(!userId || !habitId)
            throw new CustomError( 400, 'Missing habit ID');
        const habit = await useTypeORM(HabitEntity).findOne({where: { user: userId, id: habitId }});
        if(!habit)
            throw new CustomError( 404, 'habit not found');
            
        const track = new TrackEntity()
        track.quatity = req.body.quatity || 100;
        track.time = req.body.time;
        track.habit = habit as HabitEntity;

        const newTrack = await useTypeORM(TrackEntity).save(track);
        res.status(201).json(newTrack);
    } catch (error) {
        console.log(error);
        next(error)
    }
}

//update tracks
async function updateTrack(req: Request, res: Response, next: NextFunction) {
    try {
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        const userId = req.user.id; 
        const habitId = req.body.habitId;  
        const id = req.params.id;
        if(!userId || !id || !habitId)
            throw new CustomError( 400, 'Missing habit or track ID');
        const habit = await useTypeORM(HabitEntity).find({where: { user: userId, id: habitId },});
        if(!habit)
            throw new CustomError( 404, 'habit not found');
        const { error } = await updateTrackValidator(req.body);
        if (error)
            throw new CustomError(400, error?.details[0].message);
        const track = await useTypeORM(TrackEntity).findOne({where: {id: id, habit: habitId}})
        console.log(track);
        
        const changes: Partial<TrackEntity> = req.body;
        const TrackChanges = { ...track, ...changes };
        const updatedData = await useTypeORM(TrackEntity).save(TrackChanges);
        res.json(updatedData);
    } catch (error) {
        console.log(error);
        next(error)
    }
}

//delete tracks
async function deleteTrack(req: Request, res: Response, next: NextFunction) {
    try {
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        const userId = req.user.id; 
        const habitId = req.params.habitId;       
        const id = req.params.trackId;
        if(!userId || !id || !habitId)
            throw new CustomError( 400, 'Missing habit or track ID');
        const existingHabit = await useTypeORM(HabitEntity).findOne({where: { user: userId, id: habitId },});
        if(!existingHabit)
            throw new CustomError( 404, 'habit not found');
        // const track = await useTypeORM(TrackEntity).find({where: {id: id, habit: habitId}}) 
        const track = await useTypeORM(TrackEntity).find({where: {id: id}, relations: ["habit"]})
        
        if(!track || track.length==0)
            throw new CustomError( 404, 'Track not found');

        if(Number(track[0]?.habit?.id)!==Number(habitId))
            throw new CustomError(400, "habit id incorrect")
        await useTypeORM(TrackEntity).remove(track);     
        res.send({ message: 'track removed!' });
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export {
    getAllTracksForAdmin,
    getAllTracks,
    addTrack,
    updateTrack,
    deleteTrack
}