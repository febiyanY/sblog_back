import { Router } from 'express'
import c_posts from '../controllers/posts'
import { clientAuth } from '../middleware/auth'

const router = Router()

router.get('/', c_posts.getAll)
router.post('/', clientAuth, c_posts.addPost)
router.patch('/', clientAuth, c_posts.updatePost)
router.delete('/:id', clientAuth, c_posts.deletePost)
router.get('/:id', c_posts.getOnePost)
router.get('/user/:userid', clientAuth, c_posts.getPostPerUser)


export default router