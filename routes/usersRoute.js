import { Router } from "express";
import { fecthAllUsers, updateUser } from "../controllers/usersController.js";
import { isAuth } from "../helpers/authMiddleware.js";

const router=Router()

router.get("/",isAuth,fecthAllUsers)
    .patch("/:uid",isAuth,updateUser)

export default router;