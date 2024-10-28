const Post = require("../models/post");

const createPost = async (req, res) => {
  try {
    const savedPost = await Post.create(req.body);
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "글을 삭제했습니다." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getPosts, getPost, createPost, updatePost, deletePost };
