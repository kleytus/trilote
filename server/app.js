const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Welcome to Grocery Service APIs.')
})

app.listen(3000, function () {
  console.log('Grocery Web app service listening on port 3000!')
})