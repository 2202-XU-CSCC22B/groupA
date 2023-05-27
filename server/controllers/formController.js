const FormSubmission = require("../models/formModel.js");


exports.createForm = async (req, res) => {
  try {
    const form = new FormSubmission(req.body);
    await form.save();
    res.status(201).send(form);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to create form', message: error.message });
  }
  };