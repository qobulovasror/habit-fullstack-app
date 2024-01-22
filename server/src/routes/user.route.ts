import { Router } from "express";
import { addUser, deleteUser, getAllUsers, getUserbyId, updateUser } from "../controllers/user.controller";


const userRouter = Router()

//get all users
userRouter.get("/", getAllUsers)

//get one user by id
userRouter.get("/:id", getUserbyId)

//post user
userRouter.post("/", addUser)

//update user by id
userRouter.put("/:id", updateUser)

//delete user by id
userRouter.delete("/:id", deleteUser)


export default userRouter;