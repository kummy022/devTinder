const express = require("express");

const app = express();

app.use("/", (req, res)=>{
  res.send("Hello welcome to NodeJs");
} );

app.use("/profile", (req, res)=>{
  res.send(" NodeJs profile");
});


app.listen(7777);

