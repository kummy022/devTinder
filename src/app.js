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

app.delete("/user", async(req, res)=>{
  const userId = req.body._id;
  try{
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  }catch(err){
    res.status(404).send("user Id not found");

  }
});

app.patch("/user",async(req, res)=>{
  const userName = req.body.firstName;
  
  try{
    const user = await User.findOneAndUpdate({firstName:userName}, {firstName: "kummy"});
    if(!user){
      res.send("user not found");
    }
    res.send("user updated successfully");
  }catch(err){
    res.status(500).send("user name not found")
  };
});

connectDB().then(()=>{
console.log("Database connection established");
app.listen(3000, console.log("sever running successfully"));
})
.catch((err)=>{
  console.error("connection not established");
})





