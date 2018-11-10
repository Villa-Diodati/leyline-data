const mongoose = require('mongoose')

const {
  dbUser,
  dbPassword,
  ds,
  mlabPort,
  mlabDBName,
} = require('../config')

const isProduction = process.env.NODE_ENV === 'production'
const dbURI = `mongodb://${dbUser}:${dbPassword}@${ds}${mlabPort}.mlab.com:${mlabPort}/${mlabDBName}`

const database = {
  connect: async () => {
    console.log('Your Sending-Stone is calling to a database...')
    try {
      await mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true })
      process.env.dbConnected = true
      } catch (err) {
        console.error('Mongoose Connection Err:', err)
        throw new Error (err)
      }
    }
}

module.exports = database
