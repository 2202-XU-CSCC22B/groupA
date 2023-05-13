const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
const url = 'mongodb+srv://SLP_Property_Pass:<ExitPass123>@cluster0.xas87bl.mongodb.net/';
const client = new MongoClient(mongoURI, { useUnifiedTopology: true });

client.connect((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  console.log('Connected to MongoDB');

  const db = client.db();

  // Start the server
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
});

// Handle POST request to save data
app.post('/api/save-data', (req, res) => {
  const { selectedOption, selectedDate } = req.body;

  const collection = client.db().collection('your-collection-name');

  // Insert a new document into your MongoDB collection
  collection.insertOne({ selectedOption, selectedDate }, (err, result) => {
    if (err) {
      console.error('Error saving data:', err);
      res.status(500).json({ message: 'An error occurred' });
      return;
    }

    res.status(201).json({ message: 'Data saved successfully' });
  });
});

