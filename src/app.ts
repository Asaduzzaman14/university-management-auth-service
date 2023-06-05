import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
import { UserRoutes } from './app/modules/users/user.route'
import ApiError from './errors/ApiError'

// parser
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) // Add this line to parse JSON data

// application routes

app.use('/api/v1/users/', UserRoutes)

// GET method route
app.get('/', (req: Request, res: Response) => {
  throw new ApiError(400, 'this is api error')
})

// global error handler

app.use(globalErrorHandler)

export default app
