import express from "express"

const app = express();


app.use(express.json());
app.use(express.static("public"));


import userRouter from '../src/routers/user.router.js'
import issueRouter from '../src/routers/issue.router.js'
import commentRouter from '../src/routers/comment.router.js'

app.use("/api/v1/users", userRouter)
app.use("/api/v1/issues", issueRouter)
app.use("/api/v1/comments", commentRouter)

export default app;