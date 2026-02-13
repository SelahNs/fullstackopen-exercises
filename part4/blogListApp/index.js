const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const Blog = require('./models/blog')


const app = express()


mongoose.connect(config.mongoUrl, { family: 4 }).then(
  ()=> logger.info('connected to', config.mongoUrl)
)
.catch(error => { logger.err('error in connection to database', error.message)})



app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`)
})