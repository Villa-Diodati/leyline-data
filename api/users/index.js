const router = require('express').Router()

const { make } = require('./controller')

console.log('\n\nWhat is make?', make)

router.route('/')
  .post(make)

module.exports = router
