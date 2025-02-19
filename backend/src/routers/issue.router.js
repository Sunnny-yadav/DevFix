import { Router } from "express";
import { getAllIssues, registerIssue } from "../controllers/issues.controller.js";
import { upload } from "../Middlewares/multer.middleware.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";

const router = Router();

router.route("/register-issue").post(
  upload.fields([
    { name: "errorImage", maxCount: 1 },
    { name: "codeSnippet", maxCount: 1 },
  ]),
  verifyJWT,
  registerIssue
);

router.route("/get-issuesList").get(getAllIssues);

export default router;
