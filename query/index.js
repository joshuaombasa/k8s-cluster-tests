const express = require('express')
const axios = require('axios')
const cors = require('cors')
const { randomBytes } = require('crypto')
const PORT = 4004

const posts = {}

const processEvents = (type, data) => {

  if (type === 'PostCreated') {
    const { id, post } = data
    posts[id] = { postId: id, post, comments: [] }
  }

  if (type === 'CommentCreated') {
    const { postId, id, comment, status } = data
    const comments = posts[postId].comments
    comments.push({ id, comment, status })
  }

  if (type === 'CommentUpdated') {
    const { postId, id, comment, status } = data
    const comments = posts[postId].comments
    const commentToUpdate = comments.find(comment => comment.id === id)
    commentToUpdate.status = status
    commentToUpdate.comment = comment
  }
}

const app = express()
app.use(cors())
app.use(express.json())

app.get('/query', (request, response) => {
  response.send(posts)
})

app.post('/events', (request, response) => {
  const event = request.body
  console.log(event)
  const { type, data } = event

  processEvents(type, data)

  response.send({})
})

app.listen(PORT, async () => {
  const storedEvents = await axios.get('http://localhost:4005/events')
  for (let event of storedEvents.data) {
    const { type, data } = event
    processEvents(type, data)
  }
  console.log('server running on port 4004')
})