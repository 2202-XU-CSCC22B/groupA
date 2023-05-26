const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'Property Pass System';

// MongoDB client instance
let client = null;

// Connect to MongoDB
const connect = async () => {
  try {
    // Create a new MongoClient
    client = new MongoClient(url);

    // Connect to the MongoDB server
    await client.connect();

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

// Get the MongoDB database instance
const getDb = () => {
  if (!client) {
    throw new Error('MongoDB connection not established');
  }

  // Return the database instance
  return client.db(dbName);
};

// Disconnect from MongoDB
const disconnect = async () => {
  if (client) {
    // Close the MongoDB connection
    await client.close();
    console.log('Disconnected from MongoDB');
  }
};

module.exports = {
  connect,
  getDb,
  disconnect,
};