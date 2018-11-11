const jwt = require('express-jwt')
const { secret } = require('../config')

const getTokenFromHeader = ({
  headers = {}
} = {},
{
  authorization = ''
} = headers) => {
  if (authorization && (authorization.split(' ')[0] === 'Token' ||
      authorization.split(' ')[0] === 'Bearer')) {
    return authorization.split(' ')[1]
  }

  return null
}

const auth = {
  required: jwt({
    secret,
    userProperty: 'payload',
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret,
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
}

module.exports = auth
