import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import routers from './app/modules/users/users.route'

// parser
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// application routes
// console.log(process.env)

app.use('/api/v1/users/', routers)

// GET method route
app.get('/', (req: Request, res: Response) => {
  res.send('Working successfully')
})

export default app
