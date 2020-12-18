const { Router } = require('express');
const router = Router();
const { RoomController } = require('../controllers/room');
const { BookingController } = require('../controllers/booking');
const { Authentication, IsAdmin } = require('../middlewares/auth');
const { uploader } = require('../middlewares/multer')

router.post('/add/:id', Authentication, BookingController.addBooking)
router.get('/', IsAdmin, BookingController.getAllBooking)
router.get('/:roomId', IsAdmin, BookingController.getBookingbyRoom)
router.get('/:userId', IsAdmin, BookingController.getBookingbyUser)
router.post('/approved/:id', IsAdmin, BookingController.bookingApproved)
router.put('/rejected/:id', IsAdmin, BookingController.bookingRejected)

module.exports = router;