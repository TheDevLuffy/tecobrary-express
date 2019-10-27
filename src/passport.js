const passport = require('passport')
const { User } = require('./models')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const config = require('./config/config')
const logger = require('../logger')

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
  }, async function (jwtPayload, done) {
    try {
      const user = await User.findOne({
        where: {
          id: jwtPayload.id
        }
      })
      logger.info(user)
      if (!user) {
        return done(new Error("존재하지 않는 유저"), false)
      }
      return done(null, user)
    } catch (error) {
      return done(new Error("유효하지 않는 jwt"), false)
    }
  })
)

module.exports = null