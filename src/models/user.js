const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({

  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 25
  },
  lastName: {
    type: String,
    maxLength: 25
  }, 
  emailId: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("invalid EmailId"+ value);
      }
    }
  },
  password: {
    type: String,
    required:true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("your password is not strong");
      }
    }

  },
  gender: {
    type: String,
    required: true,
    validate(value){
      if(!["male", "female", "other"].includes(value)){
        throw new Error("invalid");
      }
    }
  },
  contact: {
    type: String,
    required:true,
    validate(value){
      if(!validator.isMobilePhone(value, "any")){
        throw new Error("enter valid mobile number");
      }
    }
  }

},{timestamps:true });

module.exports = new mongoose.model("User", userSchema);