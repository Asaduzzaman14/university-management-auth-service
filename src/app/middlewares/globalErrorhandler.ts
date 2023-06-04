import { NextFunction, Request, Response } from 'express'

// global error handler
const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400).json({
    appErro: err,
  })
  next()
}
export default globalErrorHandler
