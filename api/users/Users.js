const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const { secret } = require('../../config')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "can't be blank"],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      index: true,
    },
    hash: String,
    salt: String,
  }
)

UserSchema.methods = {
  setPassword: function(password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
      .toString('hex')
  },

  validPassword: function(password) {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
      .toString('hex')
    return this.hash === hash
  },

  generateJWT: function() {
    const today = new Date()
    const exp = new Date(today)
    exp.setDate(today.getDate() + 60)
    const vars = {
      id: this._id,
      email: this.email,
      exp: Number(exp.getTime() / 1000),
    }
    return jwt.sign(vars, secret)
  },

  toJSON: function() {
    return {
      name: this.name,
      email: this.email,
    }
  },

  toAuthJSON: function() {
    return {
      name: this.name,
      email: this.email,
      token: this.generateJWT(),
    }
  },

  toPublicJSON: function() {
    return {
      name: this.name,
    }
  }
}

mongoose.model('User', UserSchema)
