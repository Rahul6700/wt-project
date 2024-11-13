const express = require('express')
const app = express()
const port = 5000

app.get('/test',(req, res) => {
res.send("hello there!")
})

app.use(express.json());

app.post('/name', (req, res) => {
  const name = req.body.name;
  res.send(`welcome aboard ${name}`);
})

app.listen(port, ()=>{
  console.log(`backend listening on ${port}`)
})
