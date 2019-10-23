require('dotenv').config()

module.exports = {
  port: process.env.PORT || 8081,
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIAL
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIAL,
    logging: true,
    external: {
      port: process.env.REMOTE_PORT,
      host: process.env.REMOTE_HOST,
      dialect: process.env.DB_DIAL
    }
  }
  ,
  authentication: {
    jwtSecret: process.env.JWT_SECRET
  },
  naverAPI: {
    clientId: process.env.NAVER_API_CLIENT_ID,
    clientSecret: process.env.NAVER_API_CLIENT_SECRET
  },
  gitUserOauth: {
    clientId: process.env.GIT_OAUTH_USER_CLIENT_ID,
    clientSecret: process.env.GIT_OAUTH_USER_CLIENT_SECRET,
    redirectUri: process.env.GIT_OAUTH_USER_REDIRECT_URI
  },
  gitManagerOauth: {
    clientId: process.env.GIT_OAUTH_MANAGE_CLIENT_ID,
    clientSecret: process.env.GIT_OAUTH_MANAGE_CLIENT_SECRET,
    redirectUri: process.env.GIT_OAUTH_MANAGE_REDIRECT_URI
  }
}