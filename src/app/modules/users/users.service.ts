import { User } from './users.models'
import { IUser } from './users.interface'
import config from '../../../config'
import { genarateUserId } from './users.utils'
import ApiError from '../../../errors/ApiError'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto genarated incremental id
  const id = await genarateUserId()
  user.id = id

  // default password

  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createUser = await User.create(user)
  if (!createUser) {
    throw new ApiError(400, 'Failed to cteate user')
  }
  return createUser
}

//
export default {
  createUser,
}
