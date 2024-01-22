import { Request, Response, NextFunction } from "express";

class CustomError extends Error {
    code: number;
    constructor(code: number, message: string){
        super(message);
        this.code = code;
    }
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware = function(err: CustomError, req: Request, res: Response, next: NextFunction){
    res.status(err.code || 500).json({
        ok: false,
        message: err.message || "Internal server error"
    })
}

const CustomErrorMiddleware = function(req: Request, res: Response, next: NextFunction){
    res.locals.error = new CustomError(500, "Internal server error");
    next()
}

export {
    CustomError,
    errorMiddleware,
    CustomErrorMiddleware
}