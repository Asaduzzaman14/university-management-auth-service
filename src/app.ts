import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import { UserRoutes } from './app/modules/user/user.route';
import validateRequest from './app/middlewares/validateRequest';
import { UserValidation } from './app/modules/user/user.validation';

// parser
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add this line to parse JSON data

// application routes

app.use(
  '/api/v1/users/',
  validateRequest(UserValidation.createUserZodSchema),
  UserRoutes
);

// GET method route
// app.get('/', async (req: Request, res: Response) => {
// console.log('APi is working')
// })

// global error handler

app.use(globalErrorHandler);

export default app;
