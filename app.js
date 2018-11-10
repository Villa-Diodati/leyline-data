const path = require('path')
const express = require('express')

const database = require('./utils/database')

const app = express()

database.connect()

require('./api/users/Users')

app.use('/api', require('./api'))

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`Scrying port ${server.address().port}...\n`)
})

process.on('SIGTERM', async () => {
  await server.close()
  console.log('Safely dispelling the server!')
  process.exit(0)
})
