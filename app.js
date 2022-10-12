const express = require('express')
const mongoose = require('mongoose')
const { engine } = require('express-handlebars')
const { body, validationResult } = require('express-validator')

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

app.post(
  '/',
  // urlInput must be an url
  body('urlInput').isURL(),
  (req, res) => {
    const originalUrl = req.body.urlInput.trim()
    const shortenID = shortenIdGenerator(originalUrl, 5)
    const Origin = req.get('origin')
    let isInDB = false

    const errors = validationResult(req)
    // 如果驗證後有error，handle this error
    if (!errors.isEmpty()) {
      let badRequest = true
      return res.status(400).render('error', {
        errors: errors.array(),
        Origin,
        badRequest,
      })
    }

    Record.findOne({ $and: [{ shortenID }, { originalUrl }] })
      .then(data => {
        data ? data : Record.create({ shortenID, originalUrl })
      })
      .then(data => {
        isInDB = true
        return res.render('index', {
          Origin,
          shortenID,
          isInDB,
        })
      })
      .catch(error => {
        console.log(error)
        return res.render('error')
      })
  }
)

app.get('/:shortenID', (req, res) => {
  const shortenID = req.params.shortenID
  Record.findOne({ shortenID })
    .lean()
    .then(data => {
      if (!data) {
        let notFound = true
        return res.render('error', { notFound })
      }
      return res.redirect(data.originalUrl)
    })
    .catch(error => {
      console.log(error)
      return res.render('error')
    })
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
