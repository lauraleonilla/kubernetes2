const express = require('express')
const app = express()
const port = 3001

let counter = 0

app.get('/pingpong', (req, res) => {
  res.send(`Pongs: ${counter}`);
  counter = counter += 1
})

app.get('/getpongs', (req, res) => {
  res.send(`${counter}`);
})

app.listen(port, async () => {
  console.log(`Server started in port ${port}`)
})