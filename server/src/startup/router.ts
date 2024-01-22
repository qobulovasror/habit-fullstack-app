import { Express} from 'express';

//routes
import userRouter from '../routes/user.route';
import { CustomErrorMiddleware, errorMiddleware } from '../middlewares/customError';


const routerSetup = (app: Express) =>
  //middlewares 
  app.use(CustomErrorMiddleware)

  .use("/api/user", userRouter )
  // app.use("/api/habit", userRouter )

  .use(errorMiddleware);

export default routerSetup;