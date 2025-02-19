import { Router } from "express";
import { verifyJWT } from "../Middlewares/auth.middleware.js";
import { addComment, getCommentsByIssue } from "../controllers/comments.controller.js";

const router = Router();

router.route("/:issueId/add-comment").post(verifyJWT, addComment )
router.route("/:issueId/get-comments").get(verifyJWT, getCommentsByIssue);

export default router;
