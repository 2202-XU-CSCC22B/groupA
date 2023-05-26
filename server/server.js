const express = require('express');
const mongoose = require('mongoose');
const trackRoutes = require('./routes/trackRoutes');
const PORT = 3000;

mongoose.set("strictQuery", false);

const app = express();

const user = "zen";
const pass = "RRqQveYMsiMRzgIR";
const cluster = "cluster";
const name = "main";

// Connection to the MongoDB database
mongoose.connect(
  `mongodb+srv://${user}:${pass}@${cluster}.mdgajbf.mongodb.net/${name}?retryWrites=true&w=majority`, //mongodb+srv://SLP_Property_Pass:<password>@cluster0.xas87bl.mongodb.net/?retryWrites=true&w=majority
  {
    useNewUrlParser: true,
    useUnifiedTopology: false
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080'); // Replace with your Vue app URL
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());
app.use('/track', trackRoutes); // Use the trackRoutes for the /track endpoint


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});