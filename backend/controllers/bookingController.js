const Booking = require('../models/Booking');

const getBookedDates = async (req, res) => {
    try {
        const booking = await Booking.findOne({});
        if (booking) {
            res.json(booking.bookedDates);
        } else {
            res.json([]); // No bookings yet
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching booked dates' });
    }
};

const saveBookedDates = async (req, res) => {
    const { dates } = req.body;
    try {
        let booking = await Booking.findOne({});
        if (!booking) {
            booking = new Booking({ bookedDates: dates });
        } else {
            booking.bookedDates = [...new Set([...booking.bookedDates, ...dates])]; // Avoid duplicates
        }
        await booking.save();
        res.send('Dates booked successfully');
    } catch (error) {
        res.status(500).json({ error: 'Error saving booked dates' });
    }
};

module.exports = { getBookedDates, saveBookedDates };
