import Joi from "joi";
import IUser from "../database/model/User.model";


const addUserValidator = async (data: IUser) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required().max(30),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6).max(30)
    })
    return schema.validate(data)
}


const updateUserValidator = async (data: IUser) => {
    return Joi.object({
        name: Joi.string().min(3).required().max(30),
        email: Joi.string().email().required()
    }).validateAsync(data);
}

const updatePasswordValidator = async (data: IUser) => {
    return Joi.object({
        password: Joi.string().min(6).max(30).required(),
        newPassword: Joi.string().min(6).max(30).required()
    }).validateAsync(data);
}


export {addUserValidator, updateUserValidator, updatePasswordValidator}