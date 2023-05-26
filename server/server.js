const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const formRoutes = require('./routes/formRoute');
const app = express();
const Router = require("./routes");
const upload = multer({ dest: 'uploads/' });

const PORT = 3000;

// Connection to the MongoDB database
mongoose.connect(
  'mongodb+srv://SLP_Property_Pass:ExitPass123@cluster0.xas87bl.mongodb.net/form?retryWrites=true&w=majority',
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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/upload', upload.single('file'), (req, res) => {
  // Handle the uploaded file
  console.log(req.file); // Access the uploaded file using req.file object

  // Respond with a success message or perform further operations
  res.send('File uploaded successfully');
});

app.use(express.json());
app.use('/submit-form', formRoutes);
app.use(Router);

// for Mac
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});