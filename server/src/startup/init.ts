import { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const appSetup = (app: Express) => {
  // set database connections

  const APP_PORT = process.env.PORT || 5000;

  app.listen(APP_PORT, () => {
    console.log(`Server running on http://localhost:${APP_PORT}/`);
  });

};

export default appSetup;