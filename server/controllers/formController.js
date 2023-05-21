const FormSubmission = require('../models/formSubmission');

exports.submitForm = async (req, res) => {
  try {
    const formData = req.body;

    const formSubmission = new FormSubmission(formData);

    await formSubmission.save();

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};