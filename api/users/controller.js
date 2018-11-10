const mongoose = require('mongoose')

const User = mongoose.model('User')

const userControls = {
  make: (req, res, next) => {
    console.log('\nCreating user!')
    const user = new User({
      name: 'Sample Man',
      email: 'sample@sampleman.net'
    })

    user.save()
  }
}

module.exports = userControls
