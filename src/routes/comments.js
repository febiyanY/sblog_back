import {Router} from 'express'
import c_comments from '../controllers/comments'
import {clientAuth} from '../middleware/auth'

const router = Router()

router.get('/', c_comments.getCommentPerPost)
router.post('/', clientAuth, c_comments.addComment)
router.patch('/', clientAuth, c_comments.updateComment)
router.delete('/:id', clientAuth, c_comments.deleteComment)
router.get('/:id', clientAuth, c_comments.getOneComment)

export default router
