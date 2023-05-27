const FormSubmission = require("../models/formModel.js");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.upload = upload.single('file');

exports.createForm = [
  function (req, res, next) {
    upload.single('file')(req, res, function (err) {
      if (err) {
        return next(err);
      }
      next();
    });
  },
  async function (req, res) {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      const form = new FormSubmission(req.body);
      form.file.data = req.file.buffer;
      form.file.contentType = req.file.mimetype;
      await form.save();
      res.status(201).send(form);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Failed to create form', message: error.message });
    }
  }
];