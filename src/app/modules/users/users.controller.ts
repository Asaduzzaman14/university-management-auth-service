import { NextFunction, Request, Response } from 'express'
import usersService from './users.service'

const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req.body
    // console.log(req)

    const result = await usersService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export default {
  createUserController,
}
