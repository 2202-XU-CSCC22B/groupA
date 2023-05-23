const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },

  curr_date: {
    type: Date,
    required:true
  },

  selectedTransaction: {
    type: String,
    required: true
  },

//sales
  sales_official_receipt: {
    type: String,
    required:function() {
      return this.selectedTransaction === 'sales';
    }
  },

  sales_receipt_file: {
    type: Buffer,
    required:function() {
      return this.selectedTransaction === 'sales';
    }
  },

  //transfer location
  transfer_from: {
    type: String,
    required:function() {
      return this.selectedTransaction === 'transfer_loc';
    }
  },

  transfer_to: {
    type: String,
    required:function() {
      return this.selectedTransaction === 'transfer_loc';
    }
  },

  transfer_form_number: {
    type: String,
    required:function() {
      return this.selectedTransaction === 'transfer_loc';
    }
  },
  
  transfer_form_file: {
    type: Buffer,
    required:function() {
      return this.selectedTransaction === 'transfer_loc';
    }
  },

  //repair or replacement
  repair_company: {
    type: String,
    required:function() {
      return this.selectedTransaction === 'repair_replacement';
    }
  },

  repair_assessment_file: {
    type: Buffer,
    required:function() {
      return this.selectedTransaction === 'repair_replacement';
    }
  },

  //borrowed
  borrowed_location: {
    type: String,
    required:function() {
      return this.selectedTransaction === 'borrowed';
    }
  },

  borrowed_return_date:{
    type: Date,
    required:function() {
      return this.selectedTransaction === 'borrowed';
    }
  },

  borrowed_request_file: {
    type: Buffer,
    required:function() {
      return this.selectedTransaction === 'borrowed';
    }
  },

  //others
  others_description: {
    type: String,
    required:function() {
      return this.selectedTransaction === 'others';
    }
  },

  user_remarks: {
    type: String,
    required:false
  },

  item_fields: [
    {
      particulars: String,
      propertyTag: String,
      quantity: Number,
      amount: Number
    }
  ],

  nature: [
    {
      label: String,
      value: String,
      required: true
    }
  ],

  repair_or_replacement: [
    {
      label: String,
      value: Boolean,
      required: true
    }
  ],
});

formSchema.path('selectedTransaction').validate(function(value) {
  if (this.nature) {
    const requiredNatureValues = ['sales', 'transfer_loc', 'repair_replacement', 'borrowed','others'];
    const selectedNature = this.nature.find(item => item.value === value);
    return selectedNature && requiredNatureValues.includes(selectedNature.value);
  }
  return true;
}, 'Selected Transaction is not valid for the chosen Nature.');


const formSubmission = mongoose.model("form", formSchema);
module.exports = formSubmission;