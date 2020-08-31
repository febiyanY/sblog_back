const {Router} = require('express') 
const c_users = require('../controllers/users') 
const {adminAuth, clientAuth} = require('../middleware/auth') 
const uploadMid = require('../middleware/upload') 

const upload = uploadMid('avatars', 'single', 'image')
const router = Router()

router.get('/', adminAuth, c_users.getUsers)
router.post('/', c_users.addUser)
router.patch('/', clientAuth, c_users.updateUser)
router.delete('/:id', adminAuth, c_users.deleteUser)
router.get('/:id', clientAuth, c_users.getOneUser)
router.post('/uploadava', clientAuth, upload, c_users.changeAva)

// export default router
module.exports = router