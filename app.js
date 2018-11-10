const path = require('path')
const express = require('express')

const app = express()

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`Scrying port ${server.address().port}...`)
})

process.on('SIGTERM', async () => {
  await server.close()
  console.log('Safely dispelling the server!')
  process.exit(0)
})
