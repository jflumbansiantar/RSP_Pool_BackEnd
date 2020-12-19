const { Router } = require('express');
const router = Router();
const resolvers = require('../graphQL/resolvers');
const { uploader } = require('../middlewares/multer')

router.post('/add/:id', Authentication, resolvers.createBook)
router.get('/', IsAdmin, resolvers.getAllBookings)
// router.get('/:roomId', IsAdmin, resolvers.getBookingbyRoom)
router.get('/:userId', IsAdmin, resolvers.getBookings)
router.post('/approved/:id', IsAdmin, resolvers.bookingApproved)
router.put('/rejected/:id', IsAdmin, resolvers.bookingRejected)

module.exports = router;