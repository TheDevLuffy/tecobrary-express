const jwt = require('jsonwebtoken')
const logger = require('../logger')

const config = require('../config/config')

const { getOauthUserUrl, getUserToken, getUserData } = require('./github/GithubUserOauth')
const { getOauthManagerUrl, getManagerToken, getManagerData } = require('./github/GithubManagerOauth')

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async getOauthUser(req, res) {
    res.send(getOauthUserUrl())
  },

  async getUser(req, res) {
    try {
      const token = await getUserToken(req, res)
      const userData = await getUserData(req, res, token)
      res.send({
        user: userData,
        token: jwtSignUser(userData)
      })
    } catch(error) {
      logger.error(`[GithubController] : ${error}`)
      res.status(404).send({ error })
    }
  },

  async getOauthManager(req, res) {
    res.send(getOauthManagerUrl())
  },

  async getManager(req, res) {
    try {
      const token = await getManagerToken(req, res)
      const userData = await getManagerData(req, res, token)
      res.send({
        user: userData,
        token: jwtSignUser(userData)
      })
    } catch(error) {
      logger.error(`[GithubController] : ${error}`)
      res.status(404).send({ error })
    }
  },

  async tokenAuthenticator(req, res) {
    const user = req.user
    res.send({
      user: user,
      token: jwtSignUser(user)
    })
  }
}

