const express = require('express');
const { getBookedDates, bookDates } = require('../controllers/bookingController');
const router = express.Router();

router.get('/booked-dates', getBookedDates);
router.post('/book-dates', bookDates);

module.exports = router;
