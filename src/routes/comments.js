const {Router} = require('express')
const c_comments = require('../controllers/comments')
const {clientAuth} = require('../middleware/auth')

const router = Router()

router.get('/', c_comments.getCommentPerPost)
router.post('/', clientAuth, c_comments.addComment)
router.patch('/', clientAuth, c_comments.updateComment)
router.delete('/:id', clientAuth, c_comments.deleteComment)
router.get('/:id', clientAuth, c_comments.getOneComment)
router.post('/upvote', clientAuth, c_comments.upvote)
router.post('/undoupvote', clientAuth, c_comments.undoUpvote)
router.post('/downvote', clientAuth, c_comments.downvote)
router.post('/undodownvote', clientAuth, c_comments.undoDownvote)

module.exports = router
