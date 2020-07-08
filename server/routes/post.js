const express = require('express');
const router = express.Router();
const {createPostValidator} = require('../validator/run')
const {runValidator} = require('../validator')
const { userById } = require('../controlers/user');

const {getPosts, createPost, postsByUser, postById, isPoster, deletePost, updatePost, photo, singlePost} = require('../controlers/post');
const { requireSignin } = require('../controlers/auth');



router.get('/posts',  getPosts );
router.post('/post/new/:userId', requireSignin, createPost, createPostValidator, runValidator);
router.get('/posts/by/:postId', singlePost );
router.get('/posts/by/:userId', requireSignin, postsByUser );

router.delete('/post/:postId', requireSignin, isPoster, deletePost);
router.put('/post/:postId', requireSignin, isPoster, updatePost);




// any route containing :userId, our app will first execute userByID()
router.param('userId', userById);
router.param('postId', postById);

router.get("/post/photo/:postId", photo );



module.exports = router;