const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/post");
const app = express();

// 환경 변수 설정
require("dotenv").config();

// 미들웨어 설정
app.use(express.json());

// 라우트 설정
app.use("/api/posts", postRoutes);

// 서버 시작
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

// mongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
