require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/userRoute');
const cors = require('cors')
const PORT = 3000;

// Connect to MongoDB
const url = 'mongodb+srv://SLP_Property_Pass:ExitPass123@Cluster0.xas87bl.mongodb.net/signup_login';


// Connection to the MongoDB database
mongoose.connect(
  `${url}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);


app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
