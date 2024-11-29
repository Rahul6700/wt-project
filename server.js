const express = require('express');
const { MongoClient } = require('mongodb'); // MongoDB library
const app = express();
const port = 5000;

var url = 'mongodb+srv://AshishPavan:1n2n3n4n5n6n7n8n9n@cluster0.ijbul.mongodb.net/';
let client, db;

app.use(express.json());

app.post('/createRoom', (req, res) => {
  const roomID = req.body.id; // Corrected variable name to roomID
  const user = req.body.user;
  const score = 0; // Default score for the user

  MongoClient.connect(url)
    .then((connectedClient) => {
      client = connectedClient;

      // Connect to the Game_DB database
      db = client.db('Game');

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
          roomCollection
            .insertOne(newUserData)
            .then((result) => {
              console.log(
                'User data inserted into the collection:',
                result.insertedId,
              );
              res.status(201).json({
                message:
                  'New collection created and user data added successfully',
                userId: result.insertedId,
                roomId: roomID,
              });
            })
            .catch((err) => {
              console.error(
                'Error inserting user data into the collection:',
                err,
              );
              res.status(500).json({
                error: 'Failed to insert user data into the collection',
                details: err.message,
              });
            });
        })
        .catch((err) => {
          console.error('Error creating new collection:', err);
          res.status(500).json({
            error: 'Failed to create new collection',
            details: err.message,
          });
        });
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB:', err);
      res.status(500).json({
        error: 'Failed to connect to MongoDB',
        details: err.message,
      });
    });
});

app.post('/joinRoom', async (req, res) => {
  const user = req.body.user;
  const roomId = req.body.id;
  console.log('Received Room ID:', roomId);
  console.log('Received username: ', user);
  MongoClient.connect(url)
    .then((connectedClient) => {
      client = connectedClient;
      db = client.db('Game');
      db.listCollections({ name: roomId })
        .toArray()
        .then((collections) => {
          if (collections.length > 0) {
            const roomCollection = db.collection(roomId);
            const userData = {
              username: user,
              score: 0,
            };
            roomCollection
              .insertOne(userData)
              .then((result) => {
                console.log('User data inserted:', result.insertedId);
                res
                  .status(201)
                  .json({ message: 'User details stored successfully' }); // Sending JSON response
              })
              .catch((err) => {
                console.error('Error inserting user data:', err);
                res.status(500).json({ error: 'Failed to store user details' }); // Sending JSON response
              });
          } else {
            res.status(404).json({ error: 'Room not found' }); // Sending JSON response
          }
        })
        .catch((err) => {
          console.error('Error checking collections:', err);
          res
            .status(500)
            .json({ error: 'Failed to check existing collections' }); // Sending JSON response
        });
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB:', err);
      res.status(500).json({ error: 'Failed to connect to MongoDB' }); // Sending JSON response
    });
});

// Handle user guesses
let currentImage;

app.post('/fetch', async (req, res) => {
  const roomId = req.body.id;
  try {
    const client = await MongoClient.connect(url);
    const db = client.db('Game');

    // Check if the room collection exists
    const collections = await db.listCollections({ name: roomId }).toArray();
    if (collections.length === 0) {
      client.close();
      return res.status(404).send('Room not found');
    }

    // Fetch a random image
    const randomIndex = Math.floor(Math.random() * 5) + 1;
    const currentImage = await db
      .collection('Images')
      .findOne({ ID: randomIndex });

    // Log the randomIndex and currentImage for debugging
    // console.log('Random Index:', randomIndex);
    // console.log('Current Image:', currentImage);

    if (!currentImage) {
      client.close();
      return res.status(500).send('Failed to fetch image');
    }

    // Send the image data to the front end
    res
      .status(200)
      .send({ url: currentImage.url, answer: currentImage.answer });

    client.close();
  } catch (err) {
    console.error('Error fetching image:', err);
    res.status(500).send('Error fetching image');
  }
});

// Handle user guesses
app.post('/guess', async (req, res) => {
  const { id: roomId, guess, user, currentImage } = req.body;
  try {
    const client = await MongoClient.connect(url);
    const db = client.db('Game');
    // Check if the room collection exists
    const collections = await db.listCollections({ name: roomId }).toArray();
    if (collections.length === 0) {
      client.close();
      return res.status(404).send('Room not found');
    }
    // Validate the user's guess
    if (currentImage && currentImage.answer === guess) {
      // Update user's score
      const roomCollection = db.collection(roomId);
      const userDoc = await roomCollection.findOne({ user });
      if (userDoc) {
        await roomCollection.updateOne({ user }, { $inc: { score: 1 } });
        res.status(200).send('Correct answer');
      } else {
        res.status(404).send('User not found in the room');
      }
    } else {
      res.status(400).send('Incorrect, try again');
    }
    client.close();
  } catch (err) {
    console.error('Error handling guess:', err);
    res.status(500).send('Error handling guess');
  }
});

app.post('/showUsers', async (req, res) => {
  const roomId = req.body.id;

  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(url);
    const db = client.db('Game');

    // Check if the collection exists
    const collections = await db.listCollections({ name: roomId }).toArray();
    if (collections.length === 0) {
      // If the collection doesn't exist, send a 404 response
      client.close();
      return res.status(404).send({ error: 'Room not found' });
    }

    // Fetch all usernames from the collection
    const roomCollection = db.collection(roomId);
    const users11 = await roomCollection.find({}, { projection: { username: 1, _id: 0 } }).toArray();
    const users = users11.map(user => user.username);
    console.log(`in server.js ${users} and type` + typeof users)

    // Extract the usernames into an array
    //const usernames = users.map(user => user.username);

    // Send the array of usernames as a response
    res.status(200).send(users);
    client.close();
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});
// app.post('/showUsers', async (req, res) => {
//   const roomId = req.body.id;
//
//   try {
//     // Connect to MongoDB
//     const client = await MongoClient.connect(url);
//     const db = client.db('Game');
//
//     // Check if the collection exists
//     const collections = await db.listCollections({ name: roomId }).toArray();
//     if (collections.length === 0) {
//       // If the collection doesn't exist, send a 404 response
//       client.close();
//       return res.status(404).send({ error: 'Room not found' });
//     }
//
//     // Fetch all documents from the collection
//     const roomCollection = db.collection(roomId);
//     const users = await roomCollection.find().toArray();
//     console.log(users);
//     // Send the data as a response
//     res.status(200).send(users);
//     client.close();
//   } catch (err) {
//     console.error('Error fetching users:', err);
//     res.status(500).send({ error: 'Internal Server Error' });
//   }
// });
//
app.post('/leaveRoom', async (req, res) => {
  const { user, roomId } = req.body;
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db('Game');

    // Check if the room collection exists
    const collections = await db.listCollections({ name: roomId }).toArray();
    if (collections.length === 0) {
      await client.close();
      return res.status(404).json({ error: 'Room not found' });
    }

    // Check if the user exists in the room collection
    const roomCollection = db.collection(roomId);
    const userDoc = await roomCollection.findOne({ username: user });
    if (!userDoc) {
      await client.close();
      return res.status(404).json({ error: 'User not found in the room' });
    }

    // Delete all objects associated with the user in the room collection
    await roomCollection.deleteMany({ username: user });
    res.status(200).json({
      message: `User '${user}' removed from room '${roomId}' successfully`,
    });

    await client.close();
  } catch (err) {
    console.error('Error leaving the room:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a room (collection)
app.post('/deleteRoom', async (req, res) => {
  const roomId = req.body.id;
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(url);
    const db = client.db('Game');

    // Check if the collection exists
    const collections = await db.listCollections({ name: roomId }).toArray();
    if (collections.length === 0) {
      client.close();
      return res.status(404).send({ error: 'Room not found' });
    }
    // Delete the collection
    await db.collection(roomId).drop();
    res.status(200).send({ message: `Room ${roomId} deleted successfully` });
    console.log(`Room ${roomId} deleted successfully`);

    client.close();
  } catch (err) {
    console.error('Error deleting room:', err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
