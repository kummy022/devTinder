const express = require("express");
const User = require("./models/user");


const app = express();
const connectDB = require("./config/database");
app.use(express.json());


app.post("/signUp", async( req, res)=>{
  
  try{
    const user = new User(req.body)
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

app.patch("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const updates = req.body;

    const ALLOWED_UPDATES = ["contact", "gender", "firstName", "lastName"];
    const isUpdateAllowed = Object.keys(updates).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );
    if (!isUpdateAllowed) {
      return res.status(400).send("Update is not allowed");
    }
    const user = await User.findOneAndUpdate({ _id: userId },updates,
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).send("Error updating user: " + err.message);
  }
});


connectDB().then(()=>{
console.log("Database connection established");
app.listen(3000, console.log("sever running successfully"));
})
.catch((err)=>{
  console.error("connection not established");
})





