import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECURITY_KEY;

interface CustomRequest extends Request {
    user: { id: number, email: string, name: string }
}

function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.header('x-auth-token');
    if (!secretKey) {
        console.log("JWT security key not found");
        process.exit(1);
    }

    if (!token)
        return res.status(401).json({ message: 'Unauthorized - No token provided' });

    try {
        const decoded = jwt.verify(token, secretKey) as { id: number, name: string, email: string };
        if (decoded.id && decoded.name && decoded.email) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            req.user = { id: decoded.id, email: decoded.email, name: decoded.name };
            next();
        } else {
            return res.status(401).send({ message: 'Invalid Token' });
        }
    } catch (error) {
        return res.status(401).send({ message: 'Invalid Token' });
    }
}



function checkAdmin(req: CustomRequest, res: Response, next: NextFunction) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { isAdmin } = req.user as any;
        if (isAdmin)
            return next();
        return res.status(403).json({
            message: 'Forbidden - Admin access required'
        });
    } catch {
        return res.status(401).json({
            message: "Unauthorized - Invalid Token"
        })
    }
}
export {
    auth,
    checkAdmin
};



// import { Request, Response, NextFunction } from 'express';
// import jwt, { VerifyErrors } from 'jsonwebtoken';

// const secretKey = 'yourSecretKey'; // Replace with a secure secret key

// export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
//   const token = req.header('Authorization');

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized - No token provided' });
//   }

//   jwt.verify(token, secretKey, (err: VerifyErrors | null, user: unknown) => {
//     if (err) {
//       return res.status(403).json({ message: 'Forbidden - Invalid token' });
//     }

//     req.user = user;
//     next();
//   });
// }
