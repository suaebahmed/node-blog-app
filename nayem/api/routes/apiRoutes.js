const router = require('express').Router();
const isAuthenticed = require('../../config/isAuth');

const {
commentOnPostController,
replayCommentPostController,
} = require('../controllers/comments')

const {
likeOnPost,
unlikeOnPost,
} = require('../controllers/likeDislike')
    
const {
BookmarksController,
}= require('../controllers/deshbord')

router.post('/comments/:postId',isAuthenticed, commentOnPostController);
router.post('/comments/replies/:commentId',isAuthenticed, replayCommentPostController);

router.get('/likes/:postId', isAuthenticed,likeOnPost);
router.get('/dislikes/:postId', isAuthenticed,unlikeOnPost);

router.get('/bookmarks', isAuthenticed,BookmarksController);

module.exports = router;