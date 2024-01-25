import { Request, Response, NextFunction } from "express";
import { useTypeORM } from "../database/typeorm";
import { HabitEntity } from "../database/entity/Habit.entity";
import { UserEntity } from "../database/entity/User.entity";
import { CustomError } from "../middlewares/customError";
import { addHabitValidator, updateHabitValidator } from "../validations/habit.validator";

//get all habits for admin
async function getAllHabits(req: Request, res: Response, next: NextFunction) {
    console.log("all");
    try {
        const habits = await useTypeORM(HabitEntity).find()
        console.log(habits);
        res.json(habits);
    } catch (error) {
        console.log(error);
        next(error)
    }
}

async function getUserHabits(req: Request, res: Response, next: NextFunction) {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        const userId = req.user.id;       
        if(!userId)
            throw new CustomError( 400, 'Missing user ID');

        const habits = await useTypeORM(UserEntity).findOne({ where: {id: userId}, relations: ["habits"]});
        res.json(habits?.habits);
    } catch (error) {
        console.log(error);
        next(error)
    }
}

async function addHabit(req: Request, res: Response, next: NextFunction) {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        const id = req.user.id;       
        if(!id)
            throw new CustomError( 400, 'Missing user ID');
        const existingUser = await useTypeORM(UserEntity).findOne({where: {id: id}}); 
        if(!existingUser)
            throw new CustomError(404, `User not found.`);
        const { error } = await addHabitValidator(req.body);
        if (error)
            throw new CustomError(400, error?.details[0].message);
        
        const habit = new HabitEntity()
        habit.name = req.body.name;
        habit.description = req.body.description;
        habit.frequency = req.body.frequency;
        habit.amount = req.body.amount;
        habit.amountType = req.body.amountType;
        habit.change = req.body.change;
        habit.changeValue = req.body.changeValue;
        habit.target = req.body.target;
        habit.reminder = req.body.reminder;
        habit.reminderTime = req.body.reminderTime;
        habit.user = existingUser as UserEntity;

        const newHabit = await useTypeORM(HabitEntity).save(habit);
        res.status(201).json(newHabit);
    } catch (error) {
        console.log(error);
        next(error)   
    }
}

async function updateHabit(req: Request, res: Response, next: NextFunction) {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        const userId = req.user.id;       
        const id = req.params.id;       
        if(!userId || !id )
            throw new CustomError( 400, 'Missing user ID or Missing habit ID');
        const habit = await useTypeORM(HabitEntity).find({where: { user: userId, id: id },});
        if(!habit)
            throw new CustomError( 404, 'habit not found');
        const { error } = await updateHabitValidator(req.body);
        if (error)
            throw new CustomError(400, error?.details[0].message);

        const changes: Partial<HabitEntity> = req.body;
        const HabitChanges = { ...habit, ...changes };
        const updatedData = await useTypeORM(HabitEntity).save(HabitChanges);
        res.json(updatedData);
    } catch (error) {
        console.log(error);
        next(error)   
    }
}

async function deleteHabit(req: Request, res: Response, next: NextFunction) {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        const userId = req.user.id;       
        const id = req.params.id;       
        if(!userId || !id )
            throw new CustomError( 400, 'Missing user ID or Missing habit ID');
        const habit = await useTypeORM(HabitEntity).find({where: { user: userId, id: id },});
        if(!habit || habit.length==0)
            throw new CustomError( 404, 'habit not found');
        await useTypeORM(HabitEntity).remove(habit);
        res.send({ message: 'Habit removed!' });
    } catch (error) {
        console.log(error);
        next(error)   
    }
}




export {
    getAllHabits,
    getUserHabits,
    addHabit,
    updateHabit,
    deleteHabit
}