const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const today = new Date();
const todaysName = days[today.getDay()];
const todaysNumber = today.getDate();

let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let nextMonth = currentMonth + 1;
let prevMonth = currentMonth - 1;

//Get DOM Elements
const yearHeader = document.getElementById("current-year");
const currentDay = document.getElementById("current-day")
const monthAndDate = document.getElementById("month-and-date")
const previousArrow = document.querySelector(".go-to-prev");
const nextArrow = document.querySelector(".go-to-next");
const calendarWeekHeader = document.querySelector(".calendar__week-header")
const calendarTable = document.getElementById("calendar-body");

//Event Listeners 
previousArrow.addEventListener("click", previous)
nextArrow.addEventListener("click", next);

function showCalendar(month, year) {
  yearHeader.innerHTML = year;
  calendarWeekHeader.innerHTML = "";
  calendarTable.innerHTML = "";

  //Creating the Days of Week Row
  let headerRow = document.createElement('tr');
  for (let i = 0; i < 7; i++) {
    let headerCell = document.createElement("th");
    let shortDay = days[i].slice(0, 3);
    let headerCellText = document.createTextNode(shortDay);
    if (i === 0 || i === 6) {
      headerCell.classList.add("calendar_week-header--weekend")
    }
    if (days[i] === todaysName) {
      headerCell.classList.add("current-day-of-week")
    }
    headerCell.appendChild(headerCellText);
    headerRow.appendChild(headerCell);
  }
  calendarWeekHeader.appendChild(headerRow);

  //Getting Numerical Dates to render
  const daysPrevMonth = getLeadingDays(currentMonth, currentYear);
  const daysThisMonth = getMonthDays(currentMonth, currentYear);
  const daysNextMonth = getTrailingDays(daysPrevMonth, daysThisMonth);

  let daysToRender = [...daysPrevMonth, ...daysThisMonth, ...daysNextMonth];

  //Building the Calendar Table Body 
  let dayToRender = 0;
  let isMonthCurrent = false;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      if (daysToRender[dayToRender] === 1) {
        isMonthCurrent = !isMonthCurrent;
      }
      let cell = document.createElement("td");
      let cellText = document.createTextNode(daysToRender[dayToRender])
      if (!isMonthCurrent) {
        cell.classList.add("not-current-month");
      }

      if (
        daysToRender[dayToRender] === today.getDate() &&
        currentYear === today.getFullYear() &&
        currentMonth === today.getMonth()
      ) {
        cell.classList.add("current-day");
      }
      if (j === 0 || j === 6) {
        cell.classList.add("calendar_week-days--weekend")
      }
      cell.appendChild(cellText)
      row.appendChild(cell)
      dayToRender++;
    }
    calendarTable.appendChild(row);
  }

}

//Helper Functions for Rendering calendar logic
function getLeadingDays(currentMonth, currentYear) {
  let startDay = 0;
  const leadingDays = [];
  const year = currentYear
  const month = currentMonth
  const firstWeekday = new Date(year, month, 1).getDay();
  const days = firstWeekday + 7 - (startDay + 7) - 1; // 2 days become 1 for [1, 0]
  for (let i = days * -1; i <= 0; i++) {
    leadingDays.push(new Date(year, month, i).getDate());
  }
  return leadingDays;
}

function getMonthDays(currentMonth, currentYear) {
  const monthDays = [];
  const year = currentYear
  const month = currentMonth
  const lastDay = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= lastDay; i++) monthDays.push(i);
  return monthDays;
}

function getTrailingDays(leadingDays, monthDays) {
  const trailingDays = [];
  const days = 42 - (leadingDays.length + monthDays.length);
  for (let i = 1; i <= days; i++) trailingDays.push(i);
  return trailingDays;
}

function showHeaderMonths(currentMonth) {
  let monthsHeader = document.getElementById("months-header");

  monthsHeader.innerHTML = "";

  let monthsToRender = [];

  let prevMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  let nextMonth = (currentMonth === 11) ? 0 : currentMonth + 1;

  monthsToRender.unshift(months[prevMonth], months[currentMonth], months[nextMonth]);

  monthsToRender.forEach(month => {
    let headerMonth = document.createElement("p");
    let monthText = document.createTextNode(month);

    if (month === months[currentMonth]) {
      headerMonth.classList.add("current-month")
    }
    headerMonth.appendChild(monthText);
    monthsHeader.appendChild(headerMonth);
  });

  return monthsToRender;
}

function showEvents() {
  let currentMonth = today.getMonth();
  monthAndDate.innerHTML = `${months[currentMonth]} ${todaysNumber}`;
  currentDay.innerHTML = todaysName;
}

function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}


function previous() {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
  showHeaderMonths(currentMonth);
}

function next() {
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
  showHeaderMonths(currentMonth);
}

showHeaderMonths(currentMonth);
showCalendar(currentMonth, currentYear);
showEvents();