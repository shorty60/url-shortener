const express = require('express')
const mongoose = require('mongoose')
const { engine } = require('express-handlebars')

const Record = require('./models/record')
const shortenIdGenerator = require('./utilities/shortenIdGenerator')

const app = express()
const port = 3000

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection

db.on('error', () => {
  console.log('MongoDB connection failed.')
})

db.once('open', () => {
  console.log('MongoDB connected.')
})

app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// router setting
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const originalUrl = req.body.urlInput.trim()
  const shortenID = shortenIdGenerator(originalUrl, 5)
  let isInDB = false
  Record.findOne({ $and: [{ shortenID }, { originalUrl }] })
    .then(data => {
      data ? data : Record.create({ shortenID, originalUrl })
    })
    .then(data => {
      isInDB = true
      res.render('index', { Origin: req.get('origin'), shortenID, isInDB })
    })
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
