require("dotenv").config();
require("./Config/database").ToDoDataBase();
const express = require("express");
const app = express();
const cors = require('cors');
const todoRouters = require("./Routes/todoRoutes");
const userRoutes = require("./Routes/userRoutes");
const cookieParser = require('cookie-parser');
const auth = require("./middleware/auth");


const mongoose = require("mongoose");

  const PORT = process.env.PORT || 4000 ;
  mongoose
  .connect(process.env.MongoUrl)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));


app.use(cors({
  credentials : true,
  origin : "https://auth-todo-list-mern.vercel.app"
}));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", todoRouters);
app.use("/", userRoutes);
// app.use("/", userRoutes);
app.listen( PORT,()=>{

  console.log(`App is listening at: http://localhost:${PORT}`);

})


