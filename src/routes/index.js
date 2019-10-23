const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send({
    message: 'test router'
  })
})

module.exports = router