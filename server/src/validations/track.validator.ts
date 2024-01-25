import Joi from "joi";
import ITrack from "../database/model/Track.model";

const addTrackValidator = async (data: ITrack) => {
    return Joi.object({
        habitId: Joi.number().required(),
        time: Joi.string(),
        quatity: Joi.number().default(100).min(1).max(100),
    }).validateAsync(data);
}

const updateTrackValidator = async (data: ITrack) => {
    return Joi.object({
        habitId: Joi.number().required(),
        time: Joi.string(),
        quatity: Joi.number().min(1).max(100),
    }).validateAsync(data);
}

export {
    addTrackValidator, 
    updateTrackValidator
}