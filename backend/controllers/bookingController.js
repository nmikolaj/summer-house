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

const bookDates = async (req, res) => {
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

const deleteBookedDates = async (req, res) => {
    const { dates } = req.body;
    try {
        let booking = await Booking.findOne({});
        if (booking) {
            const newBookedDates = booking.bookedDates.filter(date => !dates.includes(date));
            if (newBookedDates.length !== booking.bookedDates.length) {
                booking.bookedDates = newBookedDates;
                await booking.save();
                res.status(200).send('Dates deleted successfully');
            } else {
                res.status(404).json({ error: 'No matching dates found to delete' });
            }
        } else {
            res.status(404).json({ error: 'No bookings found' });
        }
    } catch (error) {
        console.error('Error deleting booked dates:', error);
        res.status(500).json({ error: 'Error deleting booked dates' });
    }
};



module.exports = { getBookedDates, bookDates, deleteBookedDates };
