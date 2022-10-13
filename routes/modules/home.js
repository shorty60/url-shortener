const express = require('express')
const { body, validationResult } = require('express-validator')

const shortenIdGenerator = require('../../utilities/shortenIdGenerator')
const Record = require('../../models/record')

const router = express.Router()

// 首頁
router.get('/', (req, res) => {
  res.render('index')
})

// client送出URL，提交表單給root
router.post(
  '/shortenUrls',
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
        error: errors.array()[0],
        Origin,
        badRequest,
      })
    }

    Record.findOne({ $and: [{ shortenID }, { originalUrl }] })
      .then(data => {
        if (data) {
          return data
        }
        return Record.create({ shortenID, originalUrl })
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

// 使用者GET短網址 => redirect
router.get('/:shortenID', (req, res) => {
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

module.exports = router
