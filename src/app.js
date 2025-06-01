const express = require("express");
const User = require("./models/user");


const app = express();
const connectDB = require("./config/database");

app.use(express.json());
app.post("/signUp", async( req, res)=>{
  const user = new User(req.body)
  try{
    await user.save();
    res.send("user data is added successfully");
  } catch(err){
    res.status(500).send("user data error")
  };
});

app.get("/user", async(req, res)=>{
  // const userEmail = req.body.emailId;
  // if(!userEmail){
  //   res.send("email not found");
  // }
  try{
      const user = await User.find()
      res.send(user);
  }catch(err){
    res.status(500).send("something went wrong");
  }  
});

connectDB().then(()=>{
console.log("Database connection established");
app.listen(3000, console.log("sever running successfully"));
})
.catch((err)=>{
  console.error("connection not established");
})





