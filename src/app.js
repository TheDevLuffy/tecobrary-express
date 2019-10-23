const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./models')
const config = require('./config/config')
const logger = require('./logger')
const helmet = require('helmet')
const hpp = require('hpp')

const indexRouter = require('./routes')
const naverApiRouter = require('./routes/naverApi')
const userRouter = require('./routes/user')
const manageRouter = require('./routes/manage')
const githubRouter = require('./routes/github')
const requestRouter = require('./routes/request')
const usersRouter = require('./routes/users')
const serialRouter = require('./routes/serial')
const rentRouter = require('./routes/rent')

const app = express()

sequelize.sync()

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'))
  app.use(helmet())
  app.use(hpp())
} else {
  app.use(morgan('dev'))
}

app.set('jwt-secret', config.authentication.jwtSecret)

app.use(bodyParser.json())

app.use(cors())

require('./passport')

app.use('/', indexRouter)
app.use('/naverApi', naverApiRouter)
app.use('/user', userRouter)
app.use('/manage/book', manageRouter)
app.use('/github', githubRouter)
app.use('/request', requestRouter)
app.use('/users', usersRouter)
app.use('/serials', serialRouter)
app.use('/rents', rentRouter)

sequelize.sync()
  .then(() => {
    app.listen(process.env.PORT || 8081)
    logger.info(`Server started on port ${process.env.PORT}`)
  })
