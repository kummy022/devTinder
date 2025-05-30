const mongoose = require("mongoose");

const connectDB = async()=>{
  await  mongoose.connect("mongodb+srv://kummykonnectzit:VhTSbrukVa20uBSH@kummy.lkwxidg.mongodb.net/devTinder");

};
 
module.exports= connectDB;