require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Connect to MongoDB
const url = 'mongodb+srv://SLP_Property_Pass:ExitPass123@Cluster0.xas87bl.mongodb.net/signup_login';


// Connection to the MongoDB database
mongoose.connect(
  `${url}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected successfully");
});


// application.x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// application/json response
app.use(express.json());
app.use('/api', userRoutes);
// middleware for cookies
app.use(cookieParser());
//static files
app.use('/static', express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
