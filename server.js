const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('hello there!');
});

app.use(express.json());

app.post('/joinRoom', (req, res) => {
  const user = req.body.user;
  const id = req.body.id;
  //store user in DB under the correct room_id
  // if successfull return 1, else return 0 ( return it in a variable called 'join')
  if (join == 1) {
    res.status(200).send(req.body.user); // sends back username if successfull
  } else {
    res.status(400).send(0); // 0 means room joined successfully
  }
});

//sending user guess to db
app.post('/guess', (req, res) => {
  const id = req.body.id;
  const guess = req.body.guess;
  //first check room_id, return a varible 'room_id', if room_id == id, return the room_id stored in db, else return 0
  //check with db matching
  //store yes or no in a variable, say "ans" (1 for yes, 0 for no)

  //just for demo
  // const room_id = 100;
  // const ans = 'china';

  if (id != room_id) {
    res.status(404).send(2); //2 means invalid room
    return;
  } else {
    if (ans == guess) {
      res.status(200).send(1); // 1 means correct guess
      return;
    } else {
      res.status(400).send(0); // 0 means wrong guess
    }
  }
});

//image fetching from db
app.post('/fetch', (req, res) => {
  const id = req.body.id;
  //need to fetch a random img from db along with the answer
  // store img url in 'img', answer in 'ans'
  if (img && ans) {
    res.status(200).send({ a, b });
  } else {
    res.status(500).send('error fetching image');
  }
});

//function to show connected users in the room
app.post('/showUsers', (req, res) => {
  let list = [];
  const id = req.body.id;
  // return all the connected users in the room and store them in a list
  list.push('ashish');
  list.push('rahul');
  list.push('ram');
  res.status(200).send(list);
});

app.listen(port, () => {
  console.log(`backend listening on ${port}`);
});
