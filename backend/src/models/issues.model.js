import mongoose from "mongoose";

const IssueSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
    },
    errorImage: {
      type: String,
      required: true,
    },
    codeSnippet: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }

  }, {timestamps:true});
  

  export const Issue = mongoose.models.Issue || mongoose.model("Issue", IssueSchema)