const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');
const auth = require('../middleware/auth');


router.post('/', auth, createPost);

router.get('/', getAllPosts);

router.get('/:id', getPostById);

router.put('/:id', auth, updatePost);

router.delete('/:id', auth, deletePost);

module.exports = router;