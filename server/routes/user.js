const express = require('express');
const router = express.Router();
const { userById, allUsers, getUser, updateUser, deleteUser, hasAuthorization, userPhoto, addFollowing, addFollower, removeFollowing, removeFollower, findPeople } = require('../controlers/user');
const { requireSignin } = require('../controlers/auth');

router.put("/user/follow", requireSignin, addFollowing, addFollower);
router.put("/user/unfollow", requireSignin, removeFollowing, removeFollower);

router.get('/users', allUsers);
router.get('/user/:userId', requireSignin, getUser );
router.put('/user/:userId', requireSignin, updateUser );
router.delete('/user/:userId', requireSignin, deleteUser );

router.get("/user/photo/:userId", userPhoto );

router.get('/user/findpeople/:userId', requireSignin, findPeople)





router.param('userId', userById);

module.exports = router;


