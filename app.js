const express = require('express')

const { engine } = require('express-handlebars')
const routes = require('./routes')

require('./config/mongoose')
const app = express()
const port = 3000

app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
// 把處理好的request送到主路由器
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
