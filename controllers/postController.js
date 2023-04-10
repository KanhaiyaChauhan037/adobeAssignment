const Post = require("../models/post");

exports.createPost = async (req, res) => {
  try {
    const { user_id, content } = req.body;
    const post = new Post({ user_id, content });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


exports.updatePostById = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


exports.deletePostById = async (req, res) => {
     try {
          const post = await Post.findById(req.params.id);
          if (!post) {
               return res.status(404).json({ msg: "Post not found" });
          }
          await Post.deleteOne({ _id: post._id });
          res.json({ msg: "Post removed" });
     } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error");
     }
};


exports.likePostById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


exports.unlikePostById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: -1 } },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (post.likes < 1) {
      post.likes = 0;
      await post.save();
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getTotalPosts = async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments();
    res.json({ totalPosts });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getTopLikedPosts = async (req, res) => {
  try {
    const topLikedPosts = await Post.aggregate([
      { $sort: { likes: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({ success: true, data: topLikedPosts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const users = await Post.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};