import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import routers from './app/modules/users/users.route'
import globalErrorHandler from './app/middlewares/globalErrorhandler'

// parser
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) // Add this line to parse JSON data

// application routes

app.use('/api/v1/users/', routers)

// GET method route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'hello world',
  })
})

// global error handler

app.use(globalErrorHandler)

export default app
