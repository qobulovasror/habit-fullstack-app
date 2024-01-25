import { Router } from "express";
import { auth } from "../middlewares/auth.middleware";
import { admin } from "../middlewares/role.middleware";
import { addHabit, deleteHabit, getAllHabits, getUserHabits, updateHabit } from "../controllers/habit.controller";

const habitRoute = Router();

//get all habits for admin
habitRoute.get("/all", [auth, admin], getAllHabits);

//get user habits
habitRoute.get("/", auth, getUserHabits);

//add habit
habitRoute.post("/", auth, addHabit);

//update habit
habitRoute.put("/:id", auth, updateHabit);

//delete habit
habitRoute.delete("/:id", auth, deleteHabit)

export default habitRoute;