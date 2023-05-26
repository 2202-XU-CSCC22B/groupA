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
    },
    sparse: true
  },

  sales_receipt_file: {
    type: Buffer,
    required:function() {
      return this.selectedTransaction === 'sales';
    },
    sparse: true
  },

  //transfer location
  transfer_from: {
    type: String,
    required:function() {
      return this.selectedTransaction === 'transfer_loc';
    },
    sparse: true
  },

  transfer_to: {
    type: String,
    required:function() {
      return this.selectedTransaction === 'transfer_loc';
    },
    sparse: true
  },

  transfer_form_number: {
    type: String,
    required:function() {
      return this.selectedTransaction === 'transfer_loc';
    },
    sparse: true
  },
  
  transfer_form_file: {
    type: Buffer,
    required:function() {
      return this.selectedTransaction === 'transfer_loc';
    },
    sparse: true
  },

  //repair or replacement
  repair_company: {
    type: String,
    required:function() {
      return this.selectedTransaction === 'repair_replacement';
    },
    sparse: true
  },

  repair_warranty: {
    type: Boolean,
    required:function() {
      return this.selectedTransaction === 'repair_replacement';
    },
    sparse: true
  },

  repair_assessment_file: {
    type: Buffer,
    required:function() {
      return this.selectedTransaction === 'repair_replacement';
    },
    sparse: true
  },

  //borrowed
  borrowed_location: {
    type: String,
    required:function() {
      return this.selectedTransaction === 'borrowed';
    },
    sparse: true
  },

  borrowed_return_date:{
    type: Date,
    required:function() {
      return this.selectedTransaction === 'borrowed';
    },
    sparse: true
  },

  borrowed_request_file: {
    type: Buffer,
    required:function() {
      return this.selectedTransaction === 'borrowed';
    },
    sparse: true
  },

  //others
  others_description: {
    type: String,
    required:function() {
      return this.selectedTransaction === 'others';
    },
    sparse: true
  },

  others_file: {
    type: Buffer,
    sparse: true
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

});

formSchema.path('selectedTransaction').validate(function(value) {
  if (this.nature) {
    const requiredNatureValues = ['sales', 'transfer_loc', 'repair_replacement', 'borrowed','others'];
    const selectedNature = this.nature.find(item => item.value === value);
    return selectedNature && requiredNatureValues.includes(selectedNature.value);
  }
  return true;
}, 'Selected Transaction is not valid for the chosen Nature.');


const FormSubmission = mongoose.model("Form", formSchema);
module.exports = FormSubmission;