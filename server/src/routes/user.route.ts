import { Router } from "express";
import { addUser, deleteUser, getAllUsers, getUserbyId, updatePassword, updateUser } from "../controllers/user.controller";
import { auth } from "../middlewares/auth.middleware";
import { admin } from "../middlewares/role.middleware";



const userRouter = Router()

//get all users
userRouter.get("/", auth, getAllUsers)

//get one user by id
userRouter.get("/:id", auth, getUserbyId)

//post user
userRouter.post("/", addUser)

//update user by id
userRouter.put("/:id", auth, updateUser)

//update user passwors by id
userRouter.patch("/:id", auth, updatePassword)

//delete user by id
userRouter.delete("/:id", [auth, admin], deleteUser)


export default userRouter;