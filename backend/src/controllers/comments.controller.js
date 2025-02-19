import { AsyncHandeller } from "../utils/AsyncHandeller.js";
import { Issue } from "../models/issues.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Comment } from "../models/comments.model.js";

const addComment = AsyncHandeller(async (req, res, next) => {
  const { text } = req.body;
  const issueId = req.params.issueId;
  const userId = req.userData._id; // Assuming user is authenticated

  if (!text || text.trim() === "") {
    return next({
      status: 400,
      message: "Comment text is empty",
    });
  }

  const issueExists = await Issue.findById(issueId);
  if (!issueExists) {
    return next({
      status: 404,
      message: "Issue not found",
    });
  }

  const comment = await Comment.create({
    text,
    userId,
    issueId,
  });

  if (!comment) {
    return next({
      status: 400,
      message: "Failed to add comment",
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment added successfully"));
});

const getCommentsByIssue = AsyncHandeller(async (req, res, next) => {
  const issueId = req.params.issueId;

  const comments = await Comment.find({ issueId })
    .sort({ createdAt: -1 })
    .populate("userId", "userName email");

  if (!comments || comments.length === 0) {
    return next({
      status: 404,
      message: "No comments found for this issue",
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments retrieved successfully"));
});

export { addComment, getCommentsByIssue };
