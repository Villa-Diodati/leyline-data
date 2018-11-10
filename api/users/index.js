const router = require('express').Router()

const { make } = require('./controller')

router.route('/')
  .post(make)

module.exports = router
