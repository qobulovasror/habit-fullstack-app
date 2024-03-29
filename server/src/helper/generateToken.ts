import jwt from 'jsonwebtoken';

const SECURITY_KEY = process.env.SECURITY_KEY;

export const generateToken = async (data: { id: number, name: string, email: string, role: string }) => {
    const payload = {
        user: {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role
        }
    }
    if (!SECURITY_KEY)
        throw new Error("jwt key not found");
    return jwt.sign(payload, SECURITY_KEY)
}