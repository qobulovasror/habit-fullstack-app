import { Router } from "express";
import { auth } from "../middlewares/auth.middleware";
import { addTrack, deleteTrack, getAllTracks, getAllTracksForAdmin, updateTrack } from "../controllers/track.controller";
import { admin } from "../middlewares/role.middleware";

const trackRoute = Router();

//get all track for admin
trackRoute.get("/all", [auth, admin], getAllTracksForAdmin)

//get all track by habitId
trackRoute.get("/:id", auth, getAllTracks)

//add track
trackRoute.post("/", auth, addTrack)

//update track
trackRoute.put("/:id", auth, updateTrack)

//delete track by tarckID and trackId
trackRoute.delete("/:habitId/:trackId", auth, deleteTrack)

export default trackRoute;