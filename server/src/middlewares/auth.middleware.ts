import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECURITY_KEY;

interface CustomRequest extends Request {
    user: { id: number, email: string, name: string }
}

function auth(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.header('x-auth-token');
    if (!secretKey)
        throw new Error('jwt security key not found');

    if (!token)
        return res.status(401).json({ message: 'Unauthorized - No token provided' });

    const decoded = jwt.verify(token, secretKey);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { id, name, email } = decoded as any;
    if (id && name && email) {
        req.user = { id, email, name };
        next();
    } else {
        return res.status(401).send({ message: "Invalid Token" });
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
