const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  originalUrl: {
    type: String,
    require: true,
  },
})

module.exports = mongoose.model('Record', recordSchema)
