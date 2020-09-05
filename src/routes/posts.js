const { Router } = require('express')
const c_posts = require('../controllers/posts')
const { clientAuth } = require('../middleware/auth')

const router = Router()

router.get('/', c_posts.getAll)
router.post('/', clientAuth, c_posts.addPost)
router.patch('/', clientAuth, c_posts.updatePost)
router.delete('/:id', clientAuth, c_posts.deletePost)
router.get('/user/:userid', clientAuth, c_posts.getPostPerUser)
router.post('/upvote', clientAuth,c_posts.upvote)
router.post('/undoupvote', clientAuth,c_posts.undoUpvote)
router.post('/downvote', clientAuth,c_posts.downvote)
router.post('/undodownvote', clientAuth,c_posts.undoDownvote)

router.get('/:id', c_posts.getOnePost)

module.exports = router