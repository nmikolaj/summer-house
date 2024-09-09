let navMonth = 0;
let clicked = null;
let selectedDates = [];

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

async function fetchBookedDates() {
    try {
        const response = await fetch('http://localhost:3000/api/booked-dates');
        return await response.json(); // Return booked dates array
    } catch (error) {
        console.error('Error fetching booked dates:', error);
        return [];
    }
}

async function loadCalendar() {
    const dt = new Date();

    if (navMonth !== 0) {
        dt.setMonth(new Date().getMonth() + navMonth);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    document.getElementById('monthDisplay').innerText = 
        `${dt.toLocaleDateString('pl-PL', { month: 'long' })} ${year}`;

    const calendar = document.getElementById('calendar');
    calendar.innerHTML = ''; // Clear previous days

    const bookedDates = await fetchBookedDates(); // Fetch booked dates from backend

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        const dayString = `${month + 1}/${i - paddingDays}/${year}`;

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;
            daySquare.setAttribute('data-day', dayString);
            
            if (bookedDates.includes(dayString)) {
                daySquare.classList.add('booked');
            }

            if (selectedDates.includes(dayString)) {
                daySquare.classList.add('highlighted');
            }

            daySquare.addEventListener('click', () => toggleHighlight(dayString));
        } else {
            daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);
    }
}

function toggleHighlight(dayString) {
    const daySquare = document.querySelector(`.day[data-day='${dayString}']`);
    if (daySquare) {
        daySquare.classList.toggle('highlighted');
        if (selectedDates.includes(dayString)) {
            selectedDates = selectedDates.filter(date => date !== dayString);
        } else {
            selectedDates.push(dayString);
        }
    }
}

document.getElementById('nextButton').addEventListener('click', () => {
    navMonth++;
    loadCalendar();
});

document.getElementById('backButton').addEventListener('click', () => {
    navMonth--;
    loadCalendar();
});

// Save booked dates
document.getElementById('saveButton').addEventListener('click', async () => {
    await fetch('http://localhost:3000/api/book-dates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dates: selectedDates })
    });
    alert('Dates booked successfully');
    selectedDates = []; // Clear selected dates after booking
    loadCalendar();
});

loadCalendar();
