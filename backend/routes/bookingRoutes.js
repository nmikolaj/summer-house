const express = require('express');
const { getBookedDates, bookDates, deleteBookedDates } = require('../controllers/bookingController');
const router = express.Router();

router.get('/booked-dates', getBookedDates);
router.post('/book-dates', bookDates);
router.delete('/delete-dates', deleteBookedDates);

module.exports = router;
