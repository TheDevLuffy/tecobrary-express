const { Serial } = require('../models')
const logger = require('../logger')
const SerialService = require('../service/SerialService')

const showBookSerials = async(req, res) => {
  try {
    const { bookId } = req.body
    const bookSerials = await Serial.findAll({
      where: {
        book_id: bookId
      }
    })
    res.send({
      bookSerials
    })
  } catch (error) {
    logger.error(`[SerialController.js] : ${error}`)
    res.status(404).send({
      error
    })
  }
}

const addSerial = async(req, res) => {
  try {
    const { bookId, inputSerial } = req.body
    if (!inputSerial) {
      const serial = await SerialService.create(bookId);
      res.send({
        serial
      })
      return
    }
    logger.info("input serial", inputSerial)
    const serial = await SerialService.findById(inputSerial)
      if (serial) {
      res.status(400).send({
        error: `이미 존재하는 serial 입니다.`
      })
      return
    }
    const createdSerial = await SerialService.createWithSerial(bookId, inputSerial)
    logger.info(createdSerial)
    res.send({
      serial: createdSerial
    })
  } catch (error) {
    console.error(error)
    logger.error(`[SerialController.js] : ${error}`)
    res.status(404).send({
      error
    })
  }
}

const removeSerial = async(req, res) => {
  try {
    const { id } = req.query
    await Serial.destroy({
      where: { id }
    })
    res.send({
      message: '삭제 성공'
    })
  } catch (error) {
    logger.error(`[SerialController.js] : ${error}`)
    res.status(404).send({
      error
    })
  }
}

module.exports = {
  showBookSerials,
  addSerial,
  removeSerial,
}