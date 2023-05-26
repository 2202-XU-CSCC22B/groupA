const GetData = require('../models/trackModel');

exports.retrieveData = async (req, res) => {
  try {
    const data = await GetData.findOne({});
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({ message: 'Data not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to retrieve data", message: error.message });
  }
};
 