const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  shortenID: {
    type: String,
    require: true,
    index: true,
    unique: true,
  },

  originalUrl: {
    type: String,
    require: true,
  },
})

module.exports = mongoose.model('Record', recordSchema)
