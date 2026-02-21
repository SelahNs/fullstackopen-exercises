const supertest = require('supertest');
const {test, beforeEach, after} = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('./test_helper')

beforeEach(async() => {
  await Blog.deleteMany({})
  Blog.insertMany(helper.initialBlogs)
})

test('getting all blogs', async () => {
 await api
  .get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const response = await helper.blogsInDb();

  assert.strictEqual(response.length, helper.initialBlogs.length);
  assert(response[0].id)
})

test('making post request', async () => {
  const newBlog = {
      title: "React functions",
      author: "Michael Chan",
      url: "https://reactfunctions.com/",
      likes: 17,
  }
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const after = await helper.blogsInDb()
  assert.strictEqual(after.length , helper.initialBlogs.length + 1)
})

test.only('if likes property is missing it will default to zero', async () => {
  const newBlog = {
      title: "React functions",
      author: "Michael Chan",
      url: "https://reactfunctions.com/",
  }
  const response = await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const after = await helper.blogsInDb()
  assert.strictEqual(after.length , helper.initialBlogs.length + 1)
  assert.strictEqual(response.body.likes, 0);
})

test('if the title of url are missing the request will return 400', async() => {
  const newBlog = new Blog({
      title: "React functions",
      author: "Michael Chan",
  })
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)

  const after = await helper.blogsInDb()
  assert.strictEqual(after.length , helper.initialBlogs.length)
} )

after(async ()=> {
  await mongoose.connection.close()
})