const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blog')

const app = express()


mongoose.connect(config.mongoUrl, { family: 4 }).then(
  ()=> logger.info('connected to', config.mongoUrl)
)
.catch(error => { logger.err('error in connection to database', error.message)})



app.use(express.json())

app.use('/api/blogs', blogRouter);




module.exports = app