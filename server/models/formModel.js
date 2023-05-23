const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    selectedTransaction: String,
    sales_official_receipt: String,
    transfer_from: String,
    transfer_to: String,
    transfer_form_number: String,
    repair_warranty: String,
    repair_company: String,
    borrowed_location: String,
    borrowed_return_date: Date,
    others_description: String,
    file: {
      filename: String,
      mimetype: String,
      data: Buffer
    },
    item_fields: [{
      particulars: String,
      propertyTag: String,
      quantity: Number,
      amount: Number
    }]
  });


const formSubmission = mongoose.model("form", formSchema);
module.exports = formSubmission;