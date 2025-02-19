import {AsyncHandeller} from "../utils/AsyncHandeller.js"
import {Issue} from '../models/issues.model.js'
import { upload_On_Cloudinary } from '../utils/Cloudinary.js';
import {ApiResponse} from '../utils/ApiResponse.js';

const registerIssue = AsyncHandeller(async (req, res, next) => {
    const { title, description } = req.body;
    const userId = req.userData._id; // Assuming user is authenticated
    
    if ([title, description].some(field => field === "")) {
        return next({
            status: 400,
            message: "All fields are required"
        });
    }
    
    const errorImagePath = req.files?.errorImage?.[0]?.path;
    const codeSnippetPath = req.files?.codeSnippet?.[0]?.path;
    
    if (!errorImagePath || !codeSnippetPath) {
        return next({
            status: 400,
            message: "Both error image and code snippet are required"
        });
    }
    
    const errorImageUrl = await upload_On_Cloudinary(errorImagePath);
    const codeSnippetUrl = await upload_On_Cloudinary(codeSnippetPath);
    
    if (!errorImageUrl || !codeSnippetUrl) {
        return next({
            status: 400,
            message: "Failed to upload images, try again"
        });
    }
    
    const issue = await Issue.create({
        title,
        description,
        errorImage: errorImageUrl,
        codeSnippet: codeSnippetUrl,
        userId
    });
    
    if (!issue) {
        return next({
            status: 400,
            message: "Issue registration failed"
        });
    }
    
    return res.status(200).json(new ApiResponse(200, issue, "Issue registered successfully"));
});

const getAllIssues = AsyncHandeller(async (req, res, next) => {
    const issues = await Issue.find()
        .sort({ createdAt: -1 })
      
    
    if (!issues || issues.length === 0) {
        return next({
            status: 404,
            message: "No issues found"
        });
    }
    
    return res.status(200).json(new ApiResponse(200, issues, "Issues retrieved successfully"));
});

export { registerIssue, getAllIssues }
