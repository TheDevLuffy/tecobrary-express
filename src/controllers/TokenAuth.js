const passport = require('passport')
const logger = require('../logger')

module.exports = function(req, res, next) {
  passport.authenticate('jwt', function(error, user) {
    if (error || !user) {
      logger.error(`[TokenAuth.js] : ${error}`)
      res.status(403).send({
        error: '접근이 불가능합니다.'
      })
    } else {
      req.user = user.toJSON()
      next()
    }
  })(req, res, next)
}