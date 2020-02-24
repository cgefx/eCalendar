let today = new Date();

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let todaysName = days[today.getDay()];
let todaysNumber = today.getDate();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let nextMonth = currentMonth + 1;
let prevMonth = currentMonth - 1;

//Get Calendar Headers
const yearHeader = document.getElementById("current-year");
const currentDay = document.getElementById("current-day")
let monthAndDate = document.getElementById("month-and-date")
const previousArrow = document.querySelector(".go-to-prev");
const nextArrow = document.querySelector(".go-to-next");
const tbl = document.getElementById("calendar-body");

//Event Listeners 
previousArrow.addEventListener("click", previous)
nextArrow.addEventListener("click", next);

function previous() {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
  showMonths(currentMonth);
}

function next() {
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
  showMonths(currentMonth);
}

function showMonths(currentMonth) {
  let monthsHeader = document.getElementById("months-header");

  monthsHeader.innerHTML = "";

  let monthHeader = [];

  let prevMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  let nextMonth = (currentMonth === 11) ? 0 : currentMonth + 1;

  monthHeader.unshift(months[prevMonth], months[currentMonth], months[nextMonth]);

  monthHeader.forEach(month => {
    let headerMonth = document.createElement("p");
    let monthText = document.createTextNode(month);

    if (month === months[currentMonth]) {
      headerMonth.classList.add("current-month")
    }
    headerMonth.appendChild(monthText);
    monthsHeader.appendChild(headerMonth);
  });

  return monthHeader;
}

function showEvents() {
  let currentMonth = today.getMonth();
  monthAndDate.innerHTML = `${months[currentMonth]} ${todaysNumber}`;
  currentDay.innerHTML = todaysName;
}

function showCalendar(month, year) {
  let firstDay = (new Date(year, month)).getDay();
  tbl.innerHTML = "";
  yearHeader.innerHTML = year;

  //Making the table
  let date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");

    //creating individual cells, filing them up with data.
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        cell = document.createElement("td");
        cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      else if (date > daysInMonth(month, year)) {
        break;
      }
      else {
        cell = document.createElement("td");
        cellText = document.createTextNode(date);
        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()) {
          cell.classList.add("current-day");
        }
        cell.appendChild(cellText);
        row.appendChild(cell);
        date++;
      }
    }
    tbl.appendChild(row);
  }
}

function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}

showMonths(currentMonth);
showCalendar(currentMonth, currentYear);
showEvents();