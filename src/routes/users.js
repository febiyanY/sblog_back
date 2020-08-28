import {Router} from 'express'
import c_users from '../controllers/users'
import {adminAuth, clientAuth} from '../middleware/auth'
import uploadMid from '../middleware/upload'

const upload = uploadMid('avatars', 'single', 'image')
const router = Router()

router.get('/', adminAuth, c_users.getUsers)
router.post('/', c_users.addUser)
router.patch('/', clientAuth, c_users.updateUser)
router.delete('/:id', adminAuth, c_users.deleteUser)
router.get('/:id', clientAuth, c_users.getOneUser)
router.post('/uploadava', clientAuth, upload, c_users.changeAva)

export default router