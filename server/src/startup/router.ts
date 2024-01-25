import { Express} from 'express';
import { CustomErrorMiddleware, errorMiddleware } from '../middlewares/customError';
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "../docs/swagger";

//routes
import userRouter from '../routes/user.route';
import authRoute from '../routes/auth.route';
import habitRoute from '../routes/habit.route';
import trackRoute from '../routes/track.route';

const routerSetup = (app: Express) =>
  //middlewares 
  app.use(CustomErrorMiddleware)
  
  .use("/api/user", userRouter )
  .use("/api/auth", authRoute )
  .use("/api/habit", habitRoute)
  .use("/api/track", trackRoute)
  
  .use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  .use(errorMiddleware);

export default routerSetup;