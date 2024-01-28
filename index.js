import express from "express"

import { config } from "dotenv"
config({
  path:"./.env"
})
import "./models/db.js"
import { sequelize } from "./models/db.js"
import TasksRoute from './routes/tasksRoute.js'
import AuthRoute from './routes/authRoute.js'
import UserRoute from "./routes/usersRoute.js"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import { Task } from "./models/TasksModel.js"
import { Comment } from "./models/CommentsModel.js"

import mongoose from "mongoose"


const app = express()


mongoose.connect(process.env.MONGODB_URI, { dbName:"task-management-devtown"})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });



//middleware
app.use(express.json())
app.use(cors())
app.use(morgan("tiny"))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())




//routes
app.use("/tasks", TasksRoute)
app.use("/auth",AuthRoute)
app.use("/users",UserRoute)

//listen events

Task.hasMany(Comment,{
    as:'comment',
    foreignKey:'TaskId'
})
Comment.belongsTo(Task,{
   as:'task', 
   foreignKey:'TaskId'
})

app.get("/test",(req,res)=>{
  return res.send("wokring")
})

sequelize.sync({ force: false}).then(() => {
    //(` ALL Database & tables created!`)
}).catch((error) => {
    //(`Error creating tables: ${error}`)
})

app.listen(process.env.PORT, () => {
    //("Server is running on port "+process.env.PORT)
})

