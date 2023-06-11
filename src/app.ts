import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler';
import router from './routes';
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', router);

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // Promise.reject(new Error('Something went wrong'));

// });
app.use(globalErrorHandler);
app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: `Can't find ${req.originalUrl} on this server`,
    errorMessages: [
      {
        path: req.originalUrl,
        message: `Can't find ${req.originalUrl} on this server`,
      },
    ],
  });
  next();
});
export default app;
