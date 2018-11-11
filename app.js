const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const database = require('./utils/database')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

database.connect()

require('./api/users/Users')
require('./config/passport')

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
