const axios = require('axios')
const logger = require('../logger')

const { naverAPI } = require('../config/config')

module.exports = {
  async bookSearch (req, res) {
    try {
      const response = await axios.get(`https://openapi.naver.com/v1/search/book.json`, {
        headers: {
          "X-Naver-Client-Id": naverAPI.clientId,
          "X-Naver-Client-Secret": naverAPI.clientSecret,
        },
        params: {
          "query": req.body.title,
          "display": "10",
          "start": "1"
        }
      })
      const parsedItems = []
      response.data.items.forEach(item => {
        parsedItems.push(JSON.parse(JSON.stringify(item).replace(/(<([^>]+)>)/ig,"")))
      })
      res.send({
        items: parsedItems
      })
    } catch (error) {
      logger.error(`[NaverApiController.js] : ${error}`)
      res.status(400).send({
        error
      })
    }
  }
}