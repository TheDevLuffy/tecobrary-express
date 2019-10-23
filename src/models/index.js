const Sequelize = require('sequelize')
const config = require('../config/config')

const db = {}

const sequelize = new Sequelize(
  process.env.NODE_ENV === 'production' ? config.production.database : config.development.database,
  process.env.NODE_ENV === 'production' ? config.production.username : config.development.username,
  process.env.NODE_ENV === 'production' ? config.production.password : config.development.password,
  process.env.NODE_ENV === 'production' ? config.production.external : config.development
)

db.sequelize = sequelize
db.Sequelize = Sequelize

db.User = require('./User')(sequelize, Sequelize)
db.LibraryBook = require('./LibraryBook')(sequelize, Sequelize)
db.WishBook = require('./WishBook')(sequelize, Sequelize)
db.Serial = require('./Serial')(sequelize, Sequelize)
db.RentHistory = require('./RentHistory')(sequelize, Sequelize)

db.LibraryBook.hasMany(db.Serial, { foreignKey: 'book_id', sourceKey: 'id' })
db.Serial.belongsTo(db.LibraryBook, { foreignKey: 'book_id', sourceKey: 'id' })

db.User.hasMany(db.WishBook, { foreignKey: 'user_id', sourceKey: 'id' })
db.WishBook.belongsTo(db.User, { foreignKey: 'user_id', sourceKey: 'id' })


module.exports = db