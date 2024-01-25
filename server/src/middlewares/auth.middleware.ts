import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECURITY_KEY;

function auth(req: Request, res: Response, next: NextFunction) {

    if (!secretKey) {
        console.log("JWT security key not found");
        process.exit(1);
    }
    const token = req.header('x-auth-token');

    if (!token)
        return res.status(401).json({ message: 'Unauthorized - No token provided' });

    try {
        const {user} = jwt.verify(token, secretKey) as { user: {id: number, name: string, email: string, role: string }};
        
        if (user.id && user.name && user.email && user.role) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            req.user = user;
            next();
        } else {
            return res.status(401).send({ message: 'Invalid Token' });
        }
    } catch (error) {
        console.log(error);
        
        return res.status(401).send({ message: 'Invalid Token' });
    }
}

export {
    auth,
};