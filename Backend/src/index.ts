import express from "express";


const app = express();

// middelware to read the data in json
app.use(express.json())
// routes
app.put("/hello", (req, res, next)=>{
  console.log(req.body.name)
  return res.send("Hello")
})

app.listen(5000, ()=>console.log("Server open"))