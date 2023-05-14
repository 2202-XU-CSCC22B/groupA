const express = require('express');
const mongoose = require('mongoose');
const app = express();
// const Router = require("./routes");

const PORT = 3000;

const user = "SLP_Property_Pass";
const pass = "ExitPass123";
const cluster = "Cluster0";
const name = "sample_mflix";

// Connection to the MongoDB database
mongoose.connect(
  `mongodb+srv://${user}:${pass}@${cluster}.xas87bl.mongodb.net/${name}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(express.json());
// app.use(Router);

// for Mac
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});
