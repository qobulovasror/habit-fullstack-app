import { Request, Response, NextFunction } from 'express';

function admin(req: Request, res: Response, next: NextFunction) {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (req.user.role !== "admin") {
            return res.status(403).send("The appeal was rejected");
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal server error` });
    }
}

function user(req: Request, res: Response, next: NextFunction) {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (req.user.role) {
            return res.status(403).send("The appeal was rejected");
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal server error` });
    }
}
export {
    admin,
    user
};