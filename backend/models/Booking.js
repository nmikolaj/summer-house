const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookedDates: [String],
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
