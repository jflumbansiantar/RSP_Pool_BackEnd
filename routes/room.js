const { Router } = require('express');
const router = Router();
const resolvers = require('../graphQL/resolvers');
const { Authentication, IsAdmin } = require('../middlewares/auth');
const { uploader } = require('../middlewares/multer')

router.get('/:page', resolvers.getAllRooms);
router.post('/add', IsAdmin, uploader.single('photo'), resolvers.addRoom)
router.post('/edit/:id', IsAdmin, uploader.single('photo'), resolvers.updateRoom)
router.delete('/delete/:id', IsAdmin, resolvers.deleteRoom)
// router.get('/find/room', RoomController.search);
router.get('/find/:id', resolvers.findById);


module.exports = router;


