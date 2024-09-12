// Pricelist init and sorting
const response = {
    "prices": [
       {
          "date": "FERIE ZIMOWE 2024<br>03.01-28.02.2024r",
          "price1": 1000,
          "price2": 1200
       },
       {
          "date": "MARZEC, KWIECIEŃ, MAJ, CZERWIEC",
          "price1": 750,
          "price2": 950
       },
       {
          "date": "WIELKANOC, MAJÓWKA<br>15.04-18.04.2023r, 29.04-05.05.2023r",
          "price1": 1000,
          "price2": 1200
       },
       {
          "date": "WAKACJE 2023<br>01.07-30.09.2023r",
          "price1": 1000,
          "price2": 1200
       },
       {
          "date": "PAŹDZIERNIK, LISTOPAD, GRUDZIEŃ<br>01.10-17.12.2023r",
          "price1": 700,
          "price2": 900
       },
       {
          "date": "BOŻE NARODZENIE<br>18.12-27.12.2023r",
          "price1": 1500,
          "price2": 1700
       },
       {
          "date": "SYLWESTER<br>27.12.2023-03.01.2024r",
          "price1": 2500,
          "price2": 2700
       }
    ]
 }
 
 const tableContent = document.getElementById("table-content")
 const tableButtons = document.querySelectorAll("th button");
 
 const createRow = (obj) => {
   const row = document.createElement("tr");
   const objKeys = Object.keys(obj);
   objKeys.map((key) => {
     const cell = document.createElement("td");
     cell.setAttribute("data-attr", key);
     cell.innerHTML = obj[key];
     row.appendChild(cell);
   });
   return row;
 };
 
 const getTableContent = (data) => {
   data.map((obj) => {
     const row = createRow(obj);
     tableContent.appendChild(row);
   });
 };
 
 const sortData = (data, param, direction = "asc") => {
   tableContent.innerHTML = '';
   const sortedData =
     direction == "asc"
       ? [...data].sort(function (a, b) {
           if (a[param] < b[param]) {
             return -1;
           }
           if (a[param] > b[param]) {
             return 1;
           }
           return 0;
         })
       : [...data].sort(function (a, b) {
           if (b[param] < a[param]) {
             return -1;
           }
           if (b[param] > a[param]) {
             return 1;
           }
           return 0;
         });
 
   getTableContent(sortedData);
 };
 
 const resetButtons = (event) => {
   [...tableButtons].map((button) => {
     if (button !== event.target) {
       button.removeAttribute("data-dir");
     }
   });
 };
 
 window.addEventListener("load", () => {
   getTableContent(response.prices);
 
   [...tableButtons].map((button) => {
     button.addEventListener("click", (e) => {
       resetButtons(e);
       if (e.target.getAttribute("data-dir") == "desc") {
         sortData(response.prices, e.target.id, "desc");
         e.target.setAttribute("data-dir", "asc");
       } else {
         sortData(response.prices, e.target.id, "asc");
         e.target.setAttribute("data-dir", "desc");
       }
     });
   });
 });

// Animations
AOS.init({
    duration: 1200,
    once: true,
});

// Email
function target_popup(form) {
    alert("THANK YOU!\nEmail has been submitted correctly");
}

// High contrast
let contrasted = false;
document.addEventListener('DOMContentLoaded', function() {
    var highContrast = document.getElementById('high-contrast-link');
    var sections = document.querySelectorAll('.offer, .gallery, .location');
    var transparentSections = document.querySelectorAll('.home, .steps, .pricelist');
    var navigationBar = document.querySelector('.navigation');
    var navLinks = navigationBar.querySelectorAll('a');
    var contrastText = document.getElementById('contrast-text');

    highContrast.addEventListener('click', function() {
        if(contrasted === false){
            contrasted = true;
            sections.forEach(function(section) {
                section.style.backgroundColor = 'black';
                section.style.color = "white";
            });
            transparentSections.forEach(function(section) {
                section.style.backgroundColor = 'black';
                section.style.color = "white";
            });
            
            navigationBar.style.backgroundColor = 'white';
            navigationBar.style.color = 'black';

            navLinks.forEach(function(link) {
            link.style.color = 'black';
            });
        }else{
            contrasted = false;
            sections.forEach(function(section) {
                section.style.backgroundColor = '#fcf6ef';
                section.style.color = "black";
            });
            transparentSections.forEach(function(section) {
                section.style.backgroundColor = 'transparent';
            });

            navigationBar.style.backgroundColor = 'transparent';
            navigationBar.style.color = 'white';
            
            navLinks.forEach(function(link) {
            link.style.color = 'white';
            });
        }
    });
});

document.getElementById('summaryButton').addEventListener('click', summary());
let nav = 0;
const calendar = document.getElementById('calendar');
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

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav); // Set displayed month
    }

    const today = dt.getDate();
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

    calendar.innerHTML = '';

    const bookedDates = await fetchBookedDates(); // Fetch booked dates from backend

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');
        const dayString = `${month + 1}/${i - paddingDays}/${year}`;

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;
            daySquare.setAttribute('data-day', dayString);

            // Book days in past months/years
            if (nav < 0) {
              daySquare.classList.add('booked');
            }

            // Book days before today for current month
            else if (nav === 0 && i - paddingDays < today) {
              daySquare.classList.add('booked');
            }

            // Highlight booked day
            if (bookedDates.includes(dayString)) {
                daySquare.classList.add('booked');
            }
            
            // Mark current day
            if (i - paddingDays === today && nav === 0) {
                daySquare.id = 'currentDay';
            }
            
            //daySquare.addEventListener('click', () => toggleHighlight(dayString));
        } else {
            daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);
    }
}

// Toggle day highlight (for future payment methods)
// function toggleHighlight(dayString) {
//     const daySquare = document.querySelector(`.day[data-day='${dayString}']`);
//       if (daySquare) {
//         daySquare.classList.toggle('selected');
//     }
// }

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        loadCalendar();
    });

    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        loadCalendar();
    });
}

initButtons();
loadCalendar();


function summary() {
    //const allSelectedDays = document.querySelectorAll('.day.selected');
    //allSelectedDays.forEach(day => day.classList.remove('selected'));
    // TBD
}

