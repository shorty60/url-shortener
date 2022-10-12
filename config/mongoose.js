const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection

db.on('error', () => {
  console.log('MongoDB connection failed.')
})

db.once('open', () => {
  console.log('MongoDB connected.')
})
