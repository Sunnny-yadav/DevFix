import { Router } from "express";
import { login_User, registerUser } from "../controllers/user.controller.js";
import { upload } from "../Middlewares/multer.middleware.js";

const router = Router()


router.route("/register-user").post(upload.single("profilePicture") ,registerUser);
router.route("/login-user").post(login_User);



export default router