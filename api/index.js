const router = require('express').Router()

router.use('/user', require('./users'))
router.use('/character', require('./characters'))

module.exports = router
