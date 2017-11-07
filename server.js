const express = require('express')
const app = express()
let notifyStatus = false

const sqlite3 = require('sqlite3').verbose();
//const db = new sqlite3.Database(':memory:');
const db = new sqlite3.Database('mydb.db');
// does this die when heroku goes down?

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

// initialise db
db.on('open', function() {
  db.run("CREATE TABLE status (pendingnotification INTEGER)", function(err) {
    if (err) console.error(err)
    db.run("INSERT INTO status(pendingnotification) VALUES(0)", function(err) {
      if (err) console.error(err)
      db.all("SELECT * FROM status", function(err, rows) {
        if (err) console.error(err)
        console.log(rows)
      })
      app.listen(80) // localhost/ready
    })
  })
})
