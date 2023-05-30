import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'

// parser
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// GET method route
app.get('/', (req: Request, res: any) => {
  res.send('GET request to the homepage')
})

export default app
