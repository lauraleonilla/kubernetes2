const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')

const stringGenerator = () => {
  const length = 10
  let result = ''
  const characters= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const charactersLength = characters.length
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const string = stringGenerator()
let response = `${new Date()}: ${string}`

const getStringWithDate = async () => {
  setInterval(() => {
    timeStamp = new Date()
    response = `${timeStamp}: ${string}\n`
  }, 5000)
  return response
}

const getStringWPongs = async () => {
  const string = await getStringWithDate()
  const pongs = await axios.get('http://localhost:3001/getpongs/')
  return `${string} Ping / Pongs: ${pongs.data}`
}

app.get('/', async (req, res) => {
  const data = await getStringWPongs()
  res.send(data);
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})