const express = require('express')
const app = express()
let notifyStatus = false
const respond = res => {
  res.write(`Ready: ${notifyStatus}`)
  res.end()
}
app.get(/^(\/|status)/g, (req, res) => respond(res))
app.get('/ready', (req, res) => {
  notifyStatus = true
  respond(res)
})
app.get('/received', (req, res) => {
  notifyStatus = false
  respond(res)
})
app.listen(80) // localhost/ready