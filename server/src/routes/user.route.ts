import { Router } from "express";
import { addUser, deleteUser, getAllUsers, getUserbyId, updatePassword, updateUser } from "../controllers/user.controller";
import { auth } from "../middlewares/auth.middleware";



const userRouter = Router()

//get all users
// userRouter.get("/", [auth], getAllUsers)
userRouter.get("/", getAllUsers)

//get one user by id
userRouter.get("/:id", getUserbyId)

//post user
userRouter.post("/", addUser)

//update user by id
userRouter.put("/:id", updateUser)

//update user passwors by id
userRouter.patch("/:id", updatePassword)

//delete user by id
userRouter.delete("/:id", deleteUser)


export default userRouter;