import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorlogger } from './shared/logger'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('database connection successfull')

    app.listen(config.port, () => {
      logger.info(`express app is listining in port ${config.port}`)
    })
  } catch (error) {
    errorlogger.error('Failed to connect database', error)
  }
}

main()
