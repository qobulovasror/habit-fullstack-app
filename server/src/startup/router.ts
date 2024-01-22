import { Express} from 'express';

//routes
import userRouter from '../routes/user.route';


const routerSetup = (app: Express) =>

  app.use("/api/user", userRouter )
  // app.use("/api/habit", userRouter )


  // .get('/', async (req: Request, res: Response) => {
  //   res.send('Hello Express APIvantage!');
  // });

export default routerSetup;