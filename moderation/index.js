const express = require('express')
const axios = require('axios')
const cors = require('cors')
const { randomBytes } = require('crypto')
const PORT = 4002

const posts = {}

const app = express()
app.use(cors())
app.use(express.json())


app.post('/events', async (request, response) => {
  const event = request.body
  console.log(event)
  const { type, data } = event
  if (type === 'CommentCreated') {
    const { postId, id, comment, status } = data
    const moderatedStatus = comment.includes('sex') ? 'rejected' : 'approved'

    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: { postId, id, comment, status: moderatedStatus }
    })
  }

  response.json({})
})

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})