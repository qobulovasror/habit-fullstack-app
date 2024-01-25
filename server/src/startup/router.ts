import { Express} from 'express';
import { CustomErrorMiddleware, errorMiddleware } from '../middlewares/customError';

//routes
import userRouter from '../routes/user.route';
import authRoute from '../routes/auth.route';
import habitRoute from '../routes/habit.route';


const routerSetup = (app: Express) =>
  //middlewares 
  app.use(CustomErrorMiddleware)

  .use("/api/user", userRouter )
  .use("/api/auth", authRoute )
  .use("/api/habit", habitRoute)

  .use(errorMiddleware);

export default routerSetup;