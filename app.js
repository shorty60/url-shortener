const express = require('express')
const mongoose = require('mongoose')
const { engine } = require('express-handlebars')
const Record = require('./models/record')

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

// router setting
app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
