import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function main() {
  console.log(config)

  try {
    mongoose.connect(config.database_url as string)
    console.log('database connection successfull')

    app.listen(config.port, () => {
      console.log(`express app is listining in port ${config.port}`)
    })
  } catch (error) {
    console.log('Failed to connect database', error)
  }
}

main()
