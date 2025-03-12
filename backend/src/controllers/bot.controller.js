import { AsyncHandeller } from "../utils/AsyncHandeller.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.CHATBOT_API_KEY);

const solveQuery = AsyncHandeller(async (req, res, next) => {
  const { text } = req.body;

  if(!text){
    return next({
        message:"query filed is empty"
    })
  }
  
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  if (!model) {
    return next({
      message: "Failed to load the model! refresh the page",
    });
  }

  const result = await model.generateContent(text);

  if (!result) {
    return next({
      message: "The content Generation failed",
    });
  }

  const generatedContent = result.response.text();

  if (!generatedContent) {
    return next({
      message: "generated Content is empty",
    });
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { text: generatedContent, sender: "gemini" },
        "Query solved Successfull"
      )
    );
});

export { solveQuery };
