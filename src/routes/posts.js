const { Router } = require('express')
const c_posts = require('../controllers/posts')
const { clientAuth } = require('../middleware/auth')

const router = Router()

router.get('/', c_posts.getAll)
router.post('/', clientAuth, c_posts.addPost)
router.patch('/', clientAuth, c_posts.updatePost)
router.delete('/:id', clientAuth, c_posts.deletePost)
router.get('/:id', c_posts.getOnePost)
router.get('/user/:userid', clientAuth, c_posts.getPostPerUser)


// export default router
module.exports = router