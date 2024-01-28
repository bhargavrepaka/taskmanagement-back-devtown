import { Router } from "express";
import { addComment, addTask, fetchAllTasks, fetchUserTasks, updateTask } from "../controllers/tasksController.js";
import { isAuth } from "../helpers/authMiddleware.js";

const router = Router()

router.get("/",isAuth,fetchAllTasks)
    .patch("/:tid",isAuth,updateTask)
    .post("/",isAuth,addTask)
    .get("/user",isAuth,fetchUserTasks)
    .post("/comment",isAuth,addComment)


export default router;