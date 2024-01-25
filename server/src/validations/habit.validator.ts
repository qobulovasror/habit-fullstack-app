import Joi from "joi";
import IHabit from "../database/model/Habit.model";

const addHabitValidator = async (data: IHabit) => {
    return Joi.object({
        name: Joi.string().min(3).required().max(100),
        description: Joi.string(),
        frequency: Joi.number().required(),
        amount: Joi.number(),
        amountType: Joi.string(),
        change: Joi.boolean(),
        changeValue: Joi.number().when("change", { is: true, then: Joi.required() }),
        target: Joi.number(),
        reminder: Joi.boolean(),
        reminderTime: Joi.string().when("reminder", { is: true, then: Joi.required() }),
    }).validateAsync(data);
}


const updateHabitValidator = async (data: IHabit) => {
    return Joi.object({
        name: Joi.string().min(3).required().max(100),
        description: Joi.string(),
        frequency: Joi.number().required(),
        amount: Joi.number(),
        amountType: Joi.string(),
        change: Joi.boolean(),
        changeValue: Joi.number().when("change", { is: true, then: Joi.required() }),
        target: Joi.number(),
        reminder: Joi.boolean(),
        reminderTime: Joi.string().when("reminder", { is: true, then: Joi.required() }),
    }).validateAsync(data);
}

export {
    addHabitValidator, 
    updateHabitValidator
}