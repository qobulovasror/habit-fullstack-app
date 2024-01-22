import { Router } from "express";
import { authHandler } from "../controllers/auth.controller";

const authRoute = Router()

authRoute.post('/', authHandler)

export default authRoute;