const router = require('express').Router()

const {
  createCharacter,
  updateCharacter,
  createCharacterVersion,
} = require('./controller')
const auth = require('../auth')
const send = require('../send')

router.route('/create/:_uid')
  .post(
    auth.required,
    createCharacter,
    send,
  )

router.route('/:_cid')
  .all(auth.required)
  .put(updateCharacter, send)
  .post(createCharacterVersion, send)

module.exports = router
