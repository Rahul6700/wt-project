const express = require('express');
const { MongoClient } = require('mongodb'); // MongoDB library
const app = express();
const port = 5000;

var url = "mongodb://127.0.0.1:27017";
let client, dbu, dbi, collectionUsers, collectionImages;

MongoClient.connect(url)
  .then((connectedClient) => {
    client = connectedClient;

    // Connect to 'Users' database
    dbu = client.db('Users');
    collectionUsers = dbu.collection('users');
    console.log('Connected to Users MongoDB');

    // Connect to 'Images' database
    dbi = client.db('Images');  
    collectionImages = dbi.collection('images');
    console.log('Connected to Images MongoDB');

    // Insert user data into 'Images' collection
    userData = {
      "image" : "ramisgayhehe",
      "answer" : "true",
      "ID" : 69,
    };

    collectionImages.insertOne(userData)
    .then((result) => {
      console.log('User data inserted:', result.insertedId);
      // Uncomment the following line if you are in a request handler context:
      // res.status(201).send('User details stored successfully');
    })
    .catch((err) => {
      console.error('Error inserting user data:', err);
      // Uncomment the following line if you are in a request handler context:
      // res.status(500).send('Failed to store user details');
    });

  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello there!');
});

// Create a new room
app.post('/createRoom', async (req, res) => {
  const roomId = req.body.id;

  try {
    // Check if the room already exists
    const existingRoom = await db.collection('rooms').findOne({ roomId });
    if (existingRoom) {
      return res.status(400).send('Room already exists');
    }

    // Create a new room
    await db.collection('rooms').insertOne({ roomId, users: [], scores: {} });
    res.status(200).send(1); // Room created successfully
  } catch (err) {
    console.error(err);
    res.status(500).send(0); // Error creating room
  }
});

// Join an existing room
app.post('/joinRoom', async (req, res) => {
  const user = req.body.user;
  const roomId = req.body.id;

  try {
    // Find the room
    const room = await db.collection('rooms').findOne({ roomId });
    if (!room) {
      return res.status(404).send(0); // Room not found
    }

    // Add user to the room and initialize score
    if (!room.users.includes(user)) {
      await db.collection('rooms').updateOne(
        { roomId },
        { $push: { users: user }, $set: { [`scores.${user}`]: 0 } }
      );
    }

    res.status(200).send(user); // User joined successfully
  } catch (err) {
    console.error(err);
    res.status(500).send(0); // Error joining room
  }
});

// Handle user guesses
app.post('/guess', async (req, res) => {
  const roomId = req.body.id;
  const guess = req.body.guess;
  const user = req.body.user;

  try {
    // Find the room
    const room = await db.collection('rooms').findOne({ roomId });
    if (!room) {
      return res.status(404).send(2); // Invalid room
    }

    const correctAnswer = room.correctAnswer || null; // Placeholder for answer retrieval logic

    if (correctAnswer === guess) {
      // Update the user's score
      await db.collection('rooms').updateOne(
        { roomId },
        { $inc: { [`scores.${user}`]: 1 } }
      );
      res.status(200).send(1); // Correct guess
    } else {
      res.status(400).send(0); // Wrong guess
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(0); // Error processing guess
  }
});

// Fetch a random image
app.post('/fetch', async (req, res) => {
  const roomId = req.body.id;

  try {
    // Find the room
    const room = await db.collection('rooms').findOne({ roomId });
    if (!room) {
      return res.status(404).send('Invalid room ID');
    }

    // Logic to fetch a random image (mocked for demo)
    const img = 'http://example.com/random.jpg'; // Placeholder URL
    const ans = 'china'; // Placeholder answer

    res.status(200).send({ img, ans });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching image');
  }
});

// Show connected users in the room
app.post('/showUsers', async (req, res) => {
  const roomId = req.body.id;

  try {
    // Find the room
    const room = await db.collection('rooms').findOne({ roomId });
    if (!room) {
      return res.status(404).send([]);
    }

    res.status(200).send(room.users); // Return list of users
  } catch (err) {
    console.error(err);
    res.status(500).send([]);
  }
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
