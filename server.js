const express = require('express');
const { MongoClient } = require('mongodb'); // MongoDB library
const app = express();
const port = 5000;

var url = "mongodb://127.0.0.1:27017";
let client, db, collectionImages;

MongoClient.connect(url)
  .then((connectedClient) => {
    client = connectedClient;

    db = client.db('Game_DB');
    collectionImages = db.collection('Images');
    console.log('Connected to Users MongoDB');

    userData = {
      "image" : "apex",
      "answer" : "ashish",
      "ID" : 5,
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

app.get('/pink', (req, res) => {
  console.log("request requested")
});

  app.post('/createRoom', (req, res) => {
    const roomID = req.body.id; // Corrected variable name to roomID
    const user = req.body.user;
    const score = 0; // Default score for the user
  
    MongoClient.connect(url)
      .then((connectedClient) => {
        client = connectedClient;
  
        // Connect to the Game_DB database
        db = client.db('Game_DB');
  
        // Create the new collection
        db.createCollection(`${roomID}`)
          .then(() => {
            console.log(`New collection '${roomID}' created successfully`);
  
            // Open the newly created collection and insert the object
            const roomCollection = db.collection(`${roomID}`);
            const newUserData = {
              username: user,
              score: score,
            };
  
            roomCollection.insertOne(newUserData)
              .then((result) => {
                console.log('User data inserted into the collection:', result.insertedId);
                res.status(201).send('New collection created and user data added successfully');
              })
              .catch((err) => {
                console.error('Error inserting user data into the collection:', err);
                res.status(500).send('Failed to insert user data into the collection');
              });
          })
          .catch((err) => {
            console.error('Error creating new collection:', err);
            res.status(500).send('Failed to create new collection');
          });
      })
      .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        res.status(500).send('Failed to connect to MongoDB');
      });
  });
  

  app.post('/joinRoom', async (req, res) => {
    const user = req.body.user;
    const roomId = req.body.id;
  
    MongoClient.connect(url)
      .then((connectedClient) => {
        client = connectedClient;
  
        db = client.db('Game_DB');
  
        // Check if the room collection exists
        db.listCollections({ name: roomId }).toArray()
          .then((collections) => {
            if (collections.length > 0) {
              // Fetch the room collection
              const roomCollection = db.collection(roomId);
  
              // Insert user data into the room collection
              const userData = {
                user: user,
                score: 0,
              };
  
              roomCollection.insertOne(userData)
                .then((result) => {
                  console.log('User data inserted:', result.insertedId);
                  res.status(201).send('User details stored successfully');
                })
                .catch((err) => {
                  console.error('Error inserting user data:', err);
                  res.status(500).send('Failed to store user details');
                });
            } else {
              res.status(404).send('Room not found');
            }
          })
          .catch((err) => {
            console.error('Error checking collections:', err);
            res.status(500).send('Failed to check existing collections');
          });
      })
      .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        res.status(500).send('Failed to connect to MongoDB');
      });
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

  app.post('/showUsers', async (req, res) => {
    const roomId = req.body.id;
  
    try {
      // Connect to MongoDB
      const connectedClient = await MongoClient.connect(url);
      const db = connectedClient.db('Game_DB');
  
      // Check if the collection exists
      const collections = await db.listCollections({ name: roomId }).toArray();
      if (collections.length === 0) {
        // If the collection doesn't exist, send a 404 response
        res.status(404).send({ error: 'Room not found' });
        return;
      }
  
      // Fetch all documents from the collection
      const roomCollection = db.collection(roomId);
      const users = await roomCollection.find().toArray();
  
      // Send the data as a response
      res.status(200).send(users);
      console.log('array returned successfully')
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
