const { Router } = require('express');
const router = Router();
const resolvers = require('../graphQL/resolvers');
const { Authentication, IsAdmin } = require('../middlewares/auth');
const { uploader } = require('../middlewares/multer')

router.get('/list', IsAdmin, resolvers.getAllUsers)
router.post('/login', resolvers.login)
router.post('/register', resolvers.register)
router.put('/edit/:id', Authentication, uploader.single('photo'), resolvers.editUsers)
router.get('/find/:id', IsAdmin, resolvers.findById)

module.exports = router;
