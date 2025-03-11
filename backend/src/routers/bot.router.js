import {Router} from "express"
import { solveQuery } from "../controllers/bot.controller.js"
import { verifyJWT } from "../Middlewares/auth.middleware.js"

const router = Router()


router.route("/generate").post(verifyJWT, solveQuery)

export default router