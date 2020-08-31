const {Router} = require('express')
const c_comments = require('../controllers/comments')
const {clientAuth} = require('../middleware/auth')

const router = Router()

router.get('/', c_comments.getCommentPerPost)
router.post('/', clientAuth, c_comments.addComment)
router.patch('/', clientAuth, c_comments.updateComment)
router.delete('/:id', clientAuth, c_comments.deleteComment)
router.get('/:id', clientAuth, c_comments.getOneComment)

// export default router
module.exports = router
