const mongoose=require('mongoose');
const dbSchema = mongoose.Schema({

  appr: [{
    title: {
      type: String,
    },
    name: {
      type: String,
    },
    approved: {
      type: Boolean,
      default: false
    }
  }],

});

const GetData = mongoose.model("passes", dbSchema);
module.exports = GetData;