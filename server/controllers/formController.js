const formSubmission = require("../models/formModel");

exports.createForm = async (req, res) => {
  try {
    const form = new formSubmission(req.body);
    await form.save();
    res.status(201).send(form);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to create form", message: error.message });
  }
};