import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';

import globalErrorHandler from './app/middlewares/globalErrorhandler';
import router from './app/routes';
import httpStatus from 'http-status';

// parser
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add this line to parse JSON data

// application routes

app.use('/api/v1/', router);

// app.use('/api/v1/users/', UserRoutes);
// app.use('/api/v1/semester/', SemesterRoutes);

// testing
// app.get('/', async (req: Request, res: Response) => {
// console.log('APi is working')
// })

// global error handler

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Is not Found',
      },
    ],
  });
  next();
});

export default app;
