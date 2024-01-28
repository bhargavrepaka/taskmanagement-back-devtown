import { Router } from "express";
import { loginUser, logoutUser, registerAdmin, registerUser, updateUserProfile, userDetails } from "../controllers/authController.js";
import { isAuth } from "../helpers/authMiddleware.js";

const router = Router()

router.post("/register",registerUser)
    .post("/register/admin",registerAdmin)
    .post("/login",loginUser)
    .get("/logout",logoutUser)
    .patch("/update/:uid",isAuth,updateUserProfile)
    .post("/me",isAuth,userDetails)


export default router;