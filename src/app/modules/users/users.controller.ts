import { RequestHandler } from 'express'
import usersService from './users.service'

const createUserController: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body

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
