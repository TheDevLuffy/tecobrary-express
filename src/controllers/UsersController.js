const { User } = require('../models')
const logger = require('../logger')

const _AUTH_NONE = 'NONE'
const _AUTH_USER = 'USER'
const _AUTH_MANAGER = 'MANAGER'
const _AUTH_KING = 'KING'

function authorizationParser(number) {
  if (number === 0) {
    return _AUTH_NONE
  }
  if (number === 1) {
    return _AUTH_USER
  }
  if (number === 2) {
    return _AUTH_MANAGER
  }
  if (number === 3) {
    return _AUTH_KING
  }
}

function authorizationEncode(string) {
  if (string.toUpperCase() === _AUTH_NONE) {
    return 0
  }
  if (string.toUpperCase() === _AUTH_USER) {
    return 1
  }
  if (string.toUpperCase() === _AUTH_MANAGER) {
    return 2
  }
  if (string.toUpperCase() === _AUTH_KING || string.toUpperCase() === 'GOD') {
    return 3
  }
}

module.exports = {
  async all (req, res) {
    try {
      const users = await User.findAll()
      const parsedUsers = []
      users.forEach(user => {
        const parsedUser = user.toJSON()
        parsedUsers.push({
          id: parsedUser.id,
          email: parsedUser.email,
          name: parsedUser.name,
          authorization: authorizationParser(parsedUser.authorization),
          createdAt: parsedUser.createdAt
        })
      })
      res.send({
        users: parsedUsers
      })
    } catch (error) {
      logger.error(`[UsersController.js] : ${error}`)
      res.status(400).send({
        error
      })
    }
  },

  async update(req, res) {
    try {
      const { id, newAuthorization } = req.body
      const user = await User.update({
        authorization: authorizationEncode(newAuthorization)
      }, {
        where: {
          id
        }
      })
      if (user[0] === 0) {
        res.status(400).send({
          error: '잘못된 요청'
        })
      }
      else if (user[0] === 1) {
        res.send({
          message: '성공'
        })
      } else {
        res.status(400).send({
          error: '원인을 찾을 수 없습니다.'
        })
      }
    } catch (error) {
      logger.error(`[UsersController.js] : ${error}`)
      res.status(400).send({
        error
      })
    }
  }
}