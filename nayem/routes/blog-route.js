const router = require('express').Router();
const isAuth = require('../config/isAuth')
const { 
    createApost,
    getAPostWithComment,
    getAllPost ,
    makeAComment,
    deleteAPost,
    editPostPage,
    updatePost
} = require('../middleware/post')

router.get('/post',(req,res)=>{   // render createPost page
    res.render('posts/createPost')
  })
router.get('/',getAllPost) // render index page
router.get('/posts/:id',getAPostWithComment); // render indevisual post page
router.get('/editPost/:id',editPostPage)// render editPost page

router.get('/delete/:id',isAuth,deleteAPost)
router.post('/create',isAuth,createApost)
router.post('/posts/:id/comment', isAuth ,makeAComment)
router.post('/update/:id',isAuth,updatePost)

module.exports = router;