const express = require('express')
const router = express.Router()
const TokenAuth = require('../controllers/TokenAuth')
const GithubController = require('../controllers/GithubController')

router.get('/oauthuser', 
  GithubController.getOauthUser
)

router.post('/user',
  GithubController.getUser
)

router.get('/oauthmanager',
  GithubController.getOauthManager
)

router.post('/manager',
  GithubController.getManager
)

router.post('/tokenauthenticate',
  TokenAuth,
  GithubController.tokenAuthenticator
)

module.exports = router