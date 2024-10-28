const express = require("express");
const Post = require("../models/post");
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post");

// 게시글 생성 (Create)
router.post("/", createPost);

// 모든 게시글 조회 (Read)
router.get("/", getPosts);

// 특정 게시글 조회 (Read)
router.get("/:id", getPost);

// 게시글 수정 (Update)
router.put("/:id", updatePost);

// 게시글 삭제 (Delete)
router.delete("/:id", deletePost);

module.exports = router;
