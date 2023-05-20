const { getDb } = require('../database');

const createUser = async (user) => {
  const db = getDb();
  const result = await db.collection('users').insertOne(user);
  return result.insertedId;
};

const findUserByEmail = async (email, password) => {
  const db = getDb();
  const user = await db.collection('users').findOne({ email });

  if (!user) {
    return false; // Email not found in the database
  }

  // Check if email and password match
  const storedPassword = user.password; // Assuming the password is stored in the user object

  if (storedPassword === password) {
    return user; // Email and password match, proceed with next code
  } else {
    return "Email or password incorrect!"; // Email found, but password is incorrect
  }
};

module.exports = {
  createUser,
  findUserByEmail,
};