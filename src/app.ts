import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import userRouter from './modules/users/user.route';
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users/', userRouter);
app.get('/', async (req: Request, res: Response) => {
  res.send('Working!');
});

export default app;
