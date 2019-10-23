const axios = require('axios')
const qs = require('querystring')

const logger = require('../../logger')

const { User } = require('../../models')
const { gitUserOauth } = require('../../config/config')
const { config, headers } = require('./headers')

const clientId = gitUserOauth.clientId
const clientSecret = gitUserOauth.clientSecret
const redirectUri = gitUserOauth.redirectUri

const getOauthUserUrl = () => {
  const url = 'https://github.com/login/oauth/authorize?'
  const query = qs.stringify({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: ['read:user', 'user:email'],
  })
  return url + query
}

const getUserToken = async (req, res) => {
  const returnCode = req.body.code
  const githubTargetUrl = "https://github.com/login/oauth/access_token" +
                          "?client_id=" + clientId +
                          "&client_secret=" + clientSecret +
                          "&code=" + returnCode

  const response = await axios.post(githubTargetUrl, headers)
  const token = qs.parse(response.data).access_token

  if (!token) {
    logger.error(`[GithubManagerOauth.js] : ${req.body}`)
    res.status(404).send({ error: 'lost token error' })
  }

  return token
}

const getUserData = async (req, res, token) => {
  const email = await _getEmail(token)
  const user = await User.findOne({ where: { email } })

  if (user !== null) {
    return user.toJSON()

  } else {
    const userInfo = await _getUserInfo(token)

    const userData = {
      github_id: userInfo.github_id,
      name: userInfo.name,
      email: email,
      avatar_url: userInfo.avatar_url,
    }

    const user = await User.create({
      github_id: userData.github_id,
      email: userData.email,
      name: userData.name,
      avatar_url: userData.avatar_url
    })

    return user.toJSON()
  }
}

const _getUserInfo = async (token) => {
  const userInfoResponse = await axios.get('https://api.github.com/user', config(token))
  return {
    github_id: userInfoResponse.data.id,
    name: userInfoResponse.data.name,
    avatar_url: userInfoResponse.data.avatar_url,
  };
}

const _getEmail = async (token) => {
  const emailResponse = await axios.get('https://api.github.com/user/emails', config(token))
  const emailInfo = emailResponse.data.filter(object => {
    return object.primary === true
  })

  return emailInfo[0].email
}

module.exports = {
  getOauthUserUrl,
  getUserToken,
  getUserData,
}