const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/posts', postController.createPost);
router.get('/posts/:id', postController.getPostById);
router.put('/posts/:id', postController.updatePostById);
router.delete('/posts/:id', postController.deletePostById);
router.post('/posts/:id/like', postController.likePostById);
router.post('/posts/:id/unlike', postController.unlikePostById);
router.get('/analytics/posts', postController.getTotalPosts);
router.get('/analytics/posts/top-liked', postController.getTopLikedPosts);
router.get("/", postController.getAllPosts);
module.exports = router;
