const express = require('express')
const app = express()
const port = 5000

app.get('/test',(req, res) => {
res.send("hello there!")
})

app.use(express.json());

app.post('/guess', (req, res) => {
  const id = req.body.id;
  const guess = req.body.guess;
  //check with db matching
})

app.post('/fetch', (req, res) => {
  const id = req.body.id;
  //need to fetch a random img from db
})

app.listen(port, ()=>{
  console.log(`backend listening on ${port}`)
})
