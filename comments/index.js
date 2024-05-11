const express = require('express')
const axios = require('axios')
const cors = require('cors')
const { randomBytes } = require('crypto')
const PORT = 4001

const comments = {}

const app = express()
app.use(cors())
app.use(express.json())

app.get('/posts/comments', (request, response) => {
  response.json(comments)
})

app.post('/posts/:id/comments', async (request, response) => {
  const { comment } = request.body
  console.log(request.params.id)
  const postId = request.params.id
  const id = randomBytes(4).toString('hex')
  comments[id] = { postId, id, comment, status: 'pending' }

  try {
    await axios.post('http://localhost:4005/events', {
      type: 'CommentCreated',
      data: { postId, id, comment, status: 'pending' }
    })
  } catch (error) {

  }
  response.send(comments[id])
})

app.post('/events', async (request, response) => {
  const event = request.body

  const {type, data} = event
  console.log(event)

  try {
    if (event.type === 'CommentModerated') {
      const { postId, id, comment, status} = data
      comments[id].status = status
      await axios.post('http://localhost:4005/events', {
        type: 'CommentUpdated',
        data: { postId, id, comment, status}
      })
    }
  } catch (error) {

  }

  response.send({})
})

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})