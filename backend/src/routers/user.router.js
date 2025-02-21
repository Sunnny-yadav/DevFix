import { Router } from "express";
import { getUserData, login_User, registerUser } from "../controllers/user.controller.js";
import { upload } from "../Middlewares/multer.middleware.js";
import {verifyJWT} from "../Middlewares/auth.middleware.js"

const router = Router()


router.route("/register-user").post(upload.single("profilePicture") ,registerUser);
router.route("/login-user").post(login_User);
router.route("/get-user-data").get(verifyJWT, getUserData);



export default router