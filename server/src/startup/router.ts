import { Express} from 'express';
import { CustomErrorMiddleware, errorMiddleware } from '../middlewares/customError';

//routes
import userRouter from '../routes/user.route';
import authRoute from '../routes/auth.route';


const routerSetup = (app: Express) =>
  //middlewares 
  app.use(CustomErrorMiddleware)

  .use("/api/user", userRouter )
  .use("/api/auth", authRoute )
  // app.use("/api/habit", userRouter )

  .use(errorMiddleware);

export default routerSetup;