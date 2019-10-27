const { Serial } = require('../models')

const parseJSON = (original) => {
  return JSON.parse(JSON.stringify(original))
}

const findById = async (serialId) => {
  const savedSerial = await Serial.findOne({
    where: {id: serialId}
  })
  if (!savedSerial) {
    return null
  }
  return parseJSON(savedSerial)
}

const create = async (bookId) => {
  const savedSerial = await Serial.create({
    book_id: bookId
  })
  return parseJSON(savedSerial)
}

const createWithSerial = async (bookId, inputSerial) => {
  const savedSerial = await Serial.create({
    id: inputSerial,
    book_id: bookId
  })
  return parseJSON(savedSerial)
}

module.exports = {
  findById,
  create,
  createWithSerial
}