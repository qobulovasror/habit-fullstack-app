import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt'
import { useTypeORM } from "../database/typeorm";
import { UserEntity } from "../database/entity/User.entity";
import { authValidator } from "../validations/user.validator";
import { CustomError } from "../middlewares/customError";
import { generateToken } from "../helper/generateToken";

async function authHandler(req: Request, res: Response, next: NextFunction){
    try {
        const {error} = await authValidator(req.body);
        if(error)
            throw new CustomError(400, error.details[0].message);
        const {email} = req.body;
        const user = await useTypeORM(UserEntity).findOneBy({email});
        if(!user)
            throw new CustomError(400, "email or password incorrect");
        const isValid = await bcrypt.compare(req.body.password, user.password);
        if(!isValid)
            throw new CustomError(400, "email or password incorrect");
        const token = await generateToken({id: user.id, name: user.name, email: user.email});
        
        return res.status(200).header({"x-auth-Token": token}).json({ok: true, message: "success"})
    } catch (err) {
        console.log(err);
        next(err);
    }
}


export {authHandler};