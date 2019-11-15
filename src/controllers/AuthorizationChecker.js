const passport = require('passport')
const logger = require('../logger')

const _AUTH_NONE = 'NONE'
const _AUTH_USER = 'USER'
const _AUTH_MANAGER = 'MANAGER'
const _AUTH_KING = 'KING'

const _NO_AUTHORIZATION_ERROR = '권한이 없습니다.'

const compareUpperAndLower = (auth, comparer) => {
  return auth === comparer.toLowerCase()
    || auth === comparer.toUpperCase()
}

const isUserAuthNone = (user) => {
  return compareUpperAndLower(_AUTH_NONE, user.authorization)
}
// user.authorization === _AUTH_NONE
const isUserAuthUnderManage = (user) => {
  return compareUpperAndLower(_AUTH_NONE, user.authorization)
    || compareUpperAndLower(_AUTH_USER, user.authorization)
}
// user.authorization === _AUTH_NONE || user.authorization === _AUTH_USER

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

const userAuth = (req, res, next) => {
  passport.authenticate('jwt', function(error, user) {
    logger.error(`[AuthorizationChecker.js] : ${error}`)
    user.authorization = authorizationParser(user.authorization)
    if (error || !user) {
      res.status(403).send({
        message: _NO_AUTHORIZATION_ERROR
      })
    } else if (isUserAuthNone(user)) {
      logger.info(`[AuthorizationChecker.js] : ${user} ${_NO_AUTHORIZATION_ERROR}`)
      res.status(403).send({
        message: _NO_AUTHORIZATION_ERROR
      })
    } else {
      req.user = user.id
      if (req.body.rentInfo) {
        req.rentInfo = {
          user: user.id,
          serial: req.body.rentInfo.serial
        }
      }
      next()
    }
  })(req, res, next)
}

const manageAuth = (req, res, next) => {
  passport.authenticate('jwt', function(error, user) {
    logger.error(error)
    const userJson = user.toJSON()
    userJson.authorization = authorizationParser(userJson.authorization)
    if (error || !user) {
      logger.info(`[AuthorizationChecker.js] : ${user} ${_NO_AUTHORIZATION_ERROR}`)
      res.status(403).send({
        message: _NO_AUTHORIZATION_ERROR
      })
    } else if (isUserAuthUnderManage(userJson)) {
      logger.info(`[AuthorizationChecker.js] : ${user} ${_NO_AUTHORIZATION_ERROR}`)
      res.status(403).send({
        message: _NO_AUTHORIZATION_ERROR
      })
    } else {
      const page = req.body.page
      req.page = page
      next()
    }
  })(req, res, next)
}

module.exports = {
  userAuth,
  manageAuth
}