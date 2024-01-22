import Joi from "joi";
import IUser from "../database/model/User.model";


const addUserValidator = async (data: IUser) => {
    return Joi.object({
        name: Joi.string().min(3).required().max(30),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30)
    }).validateAsync(data);
}


const updateUserValidator = async (data: IUser) => {
    return Joi.object({
        name: Joi.string().min(3).required().max(30),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30),
        confirmPassword: Joi.string().min(6).max(30)
    }).validateAsync(data);
}


export {addUserValidator, updateUserValidator}