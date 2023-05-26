const FormSubmission = require("../models/formModel.js");
const multer = require('multer');


// Create an instance of multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination directory to store the uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename for the uploaded file
  }
});

const upload = multer({ storage: storage });

exports.upload = upload;

exports.createForm = [
  function (req, res, next) {
    const selectedTransaction = req.body.selectedTransaction; // Get the selected transaction from the request body

    // Determine the field name based on the selected transaction
    let fieldName;
    if (selectedTransaction === 'sales') {
      fieldName = 'sales_receipt_file';
    } else if (selectedTransaction === 'transfer') {
      fieldName = 'transfer_form_file';
    } else if (selectedTransaction === 'repair') {
      fieldName = 'repair_assessment_file';
    } else if (selectedTransaction === 'borrowed') {
      fieldName = 'borrowed_request_file';
    } else if (selectedTransaction === 'others') {
      fieldName = 'others_file';
    } else {
      return res.status(400).json({ message: 'Invalid transaction type' });
    }

    // Use the determined field name in the upload middleware
    upload.single(fieldName)(req, res, function (err) {
      if (err) {
        // Handle error while uploading file
        return next(err);
      }
      next();
    });
  },
  async function (req, res) {
    // Access the uploaded file via req.file
    if (!req.file) {
      // Handle case when no file is uploaded
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      // Process the form data and save it to the database
      const form = new FormSubmission(req.body);
      form[fieldName] = req.file.buffer; // Assign the file buffer to the determined field name
      await form.save();
      res.status(201).send(form);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Failed to create form', message: error.message });
    }
  }
];


