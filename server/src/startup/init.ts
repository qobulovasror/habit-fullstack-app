import { Express } from 'express';
import dotenv from 'dotenv';
import typeORMConnect from '../database/typeorm';
dotenv.config();

const appSetup = async (app: Express) => {
  try {
    await Promise.all([
      typeORMConnect()
    ]);

    const PORT = Number(process.env.PORT) || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}/`);
    });

  } catch (error: unknown) {
    console.log('Unable to start the app!');
    console.error(error);
  }

};

export default appSetup;