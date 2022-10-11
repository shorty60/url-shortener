const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  url: {
    type: String,
    require: true,
  },
})

module.export = mongoose.model('Record', recordSchema)
