const axios = require('axios')


const base = () => (
  axios.create({
    baseURL: process.env.SLACK_BOT_URL,
    headers: {
      "Content-Type": "application/json"
    }
  })
)

module.exports = {
  base
}