const mongoose = require('mongoose')

const handleErr = require('../handleErr')

const User = mongoose.model('User')
const Character = mongoose.model('Character')
const CharacterVersion = mongoose.model('CharacterVersion')

const characterControls = {
  createCharacter: async (req, res, next) => {
    const { body, body: { name, email }, params: { _uid } } = req
    const user = await User.findOne({ email, _id: _uid })
    if (user && name) {
      const character = await new Character(body)
      const characterVersion = await new CharacterVersion(body)
      characterVersion._cid = character._id
      character.versions.push(characterVersion._id)
      character._uid = _uid

      characterVersion.save()
        .then(savedVersion => {
          character.save()
            .then(savedChar => {
              user.characters.push(savedChar._id)
              user.save()
                .then(() => {
                  res.locals.data = {
                    user,
                    character: {
                      ...savedChar.toJSON(),
                      ...savedVersion.toJSON(),
                    },
                  }
                  next()
                })
            })
            .catch(error => (
              handleErr({ msg: error, res, next })
            ))
        })
        .catch(error => (
          handleErr({ msg: error, res, next })
        ))
    } else {
      handleErr({ msg: 'no such email / _id pair exists', res, next })
    }
  },

  updateCharacter: async (req, res, next) => {
    const { body, body: { _uid }, params: { _cid } } = req
    const character = await Character.findOne({ _uid , _id: _cid })
    if (character) {
      character.set(body)
      character.save()
        .then(savedChar => {
          res.locals.data = { character: savedChar.toJSON() }
          next()
        })
        .catch(error => (
          handleErr({ msg: error, res, next })
        ))
    } else {
      handleErr({ msg: 'no such character / user pair exists', res, next })
    }
  },

  createCharacterVersion: (req, res, next) => {
    console.log('\ncreateCharacterVersion called')
    res.locals.data = { error: 'work in progress'}
    next()
    /*
    TODO: Define a method for creating a new Character Version
    for use when making updates to the less-frequently changed
    character attributes, such attributes, stats, and features.
    */
  },
}

module.exports = characterControls
