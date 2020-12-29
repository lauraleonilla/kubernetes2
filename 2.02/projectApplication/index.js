const express = require('express')
const app = express()
const cors = require('cors')
const port = 3001
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const fs = require('fs') 
const path = require('path')

app.use(express.static(path.join(__dirname, 'build')))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

const dirPath = path.join('/', 'usr', 'src', 'app', 'files')
app.use(dirPath, express.static(dirPath))
const imagePath = path.join(dirPath, 'image.jpg')

const ImageAlreadyExists = async () => new Promise(res => {
  fs.stat(imagePath, (err, stats) => {
    if (err || !stats) return res(false)
    return res(true)
  })
})

const getImage = async () => {
  const res = await fetch('https://picsum.photos/200')
  const buffer = await res.buffer();
  fs.writeFile(imagePath, buffer, () => 
    console.log('finished downloading!'));
}

app.get('/image', async (req, res) => {
  const imageExists = await ImageAlreadyExists()
  if (!imageExists) {
    await getImage()
  }
  res.send(imagePath)
})

const todos = []

app.get('/todos', (req, res) => {
  res.send(todos)
})

app.post('/todos', (req, res) => {
  todos.push(req.body.item)
  res.send(todos)
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})