const { getDb } = require('../database');

const createUser = async (user) => {
  const db = getDb();
  const result = await db.collection('users').insertOne(user);
  return result.insertedId;
};

const findUserByUsername = async (username) => {
  const db = getDb();
  return db.collection('users').findOne({ username });
};

module.exports = {
  createUser,
  findUserByUsername,
};