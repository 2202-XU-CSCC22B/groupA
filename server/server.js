require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute');
const formRoutes = require('./routes/formRoute');
const trackRoutes = require('./routes/trackRoutes');

mongoose.set("strictQuery", false);

const app = express();
const PORT = 3000;


const pass = "ExitPass123";
const cluster = "cluster0";
const name = "signup_login";

// Connection to the MongoDB database
mongoose.connect(
  `mongodb+srv://SLP_Property_Pass:${pass}@${cluster}.xas87bl.mongodb.net/${name}?retryWrites=true&w=majority`, //mongodb+srv://SLP_Property_Pass:<password>@cluster0.xas87bl.mongodb.net/?retryWrites=true&w=majority
  {
    useNewUrlParser: true,
    useUnifiedTopology: false
  });


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(express.json());

// Enable CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/submit-form', formRoutes);
app.use('/api', userRoutes);
app.use('/form', formRoutes);
app.use('/track', trackRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

module.exports = app;
