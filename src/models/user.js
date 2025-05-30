const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

  firstName: {
    type: String
  },
  lastName: {
    type: String
  }, 
  emailId: {
    type: String
  },
  gender: {
    type: String
  },
  contact: {
    type: Number
  }

});

module.exports = new mongoose.model("User", userSchema);