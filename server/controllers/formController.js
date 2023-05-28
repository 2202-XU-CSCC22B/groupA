const FormSubmission = require("../models/formModel.js");


exports.createForm = async (req, res) => {
  try {
    const form = new FormSubmission(req.body);

    try {
      const savedForm = await form.save();
      console.log('Form saved successfully:', savedForm);
      res.status(201).send(savedForm);
    } catch (error) {
      console.error('Failed to save form:', error);
      res.status(500).send({ error: 'Failed to create form', message: error.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to create form', message: error.message });
  }
};