import cors from 'cors';
import { Express } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const securitySetup = (app: Express, express: any) =>
  app
  .use(cors())
  .use(express.json())

export default securitySetup;