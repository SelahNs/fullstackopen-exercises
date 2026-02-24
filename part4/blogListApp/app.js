const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blog')
const middleware = require('./utils/middleware')
const userRouter = require('./controllers/users')

const app = express()


mongoose.connect(config.mongoUrl, { family: 4 }).then(
  ()=> logger.info('connected to', config.mongoUrl)
)
.catch(error => { logger.err('error in connection to database', error.message)})



app.use(express.json())
app.use(middleware.requestLogger);

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler);




module.exports = app