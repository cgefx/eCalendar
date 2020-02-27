const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const today = new Date();
const todaysName = days[today.getDay()];
const todaysNumber = today.getDate();

let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let nextMonth = currentMonth + 1;
let prevMonth = currentMonth - 1;

//Calendar
const yearHeader = document.querySelector(".current-year");
const monthsHeader = document.querySelector(".month-header");
const calendarWeekHeader = document.querySelector(".calendar__week-header");
const calendarTable = document.querySelector(".calendar__body");

// Events
const currentDay = document.querySelector(".events__heading--current-day");
const monthAndDate = document.querySelector(".events__heading--month-and-date");

//Prev/Next Arrows
const previousArrow = document.querySelector(".go-to-prev");
const nextArrow = document.querySelector(".go-to-next");

//Event Listeners 
previousArrow.addEventListener("click", previous);
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
    if (days[i] === todaysName &&
      currentYear === today.getFullYear() &&
      currentMonth === today.getMonth()
    ) {
      headerCell.classList.add("current-day-of-week")
    }
    headerCell.appendChild(headerCellText);
    headerRow.appendChild(headerCell);
  }
  calendarWeekHeader.appendChild(headerRow);

  //Getting numerical dates to render in calendar Body
  const daysPrevMonth = getLeadingDays(currentMonth, currentYear);
  const daysThisMonth = getMonthDays(currentMonth, currentYear);
  const daysNextMonth = getTrailingDays(daysPrevMonth, daysThisMonth);

  let daysToRender = [...daysPrevMonth, ...daysThisMonth, ...daysNextMonth];

  //Building the Calendar table body 
  let dayToRender = 0;
  let isMonthCurrent = false;
  const styledDiv = document.createElement('div');
  styledDiv.classList.add("current-day-circle");

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

      if (j === 0 || j === 6) {
        cell.classList.add("calendar_week-days--weekend")
      }

      if (
        daysToRender[dayToRender] === today.getDate() &&
        currentYear === today.getFullYear() &&
        currentMonth === today.getMonth() &&
        isMonthCurrent
      ) {
        styledDiv.appendChild(cell);
        cell.appendChild(cellText);
        cell.classList.add("current-day-text");
        row.appendChild(styledDiv);
      }
      else {
        cell.appendChild(cellText)
        row.appendChild(cell)
      }
      dayToRender++;
    }
    calendarTable.appendChild(row);
  }
}

//Helper functions used for rendering day logic
function getLeadingDays(currentMonth, currentYear) {
  let startDay = 0;
  const leadingDays = [];
  const year = currentYear
  const month = currentMonth
  const firstWeekday = new Date(year, month, 1).getDay();
  const days = firstWeekday + 7 - (startDay + 7) - 1;

  for (let i = days * -1; i <= 0; i++) {
    leadingDays.push(new Date(year, month, i).getDate());
  }
  // console.log(leadingDays);
  return leadingDays;
}

function getMonthDays(currentMonth, currentYear) {
  const currentMonthDays = [];
  const year = currentYear
  const month = currentMonth
  const lastDay = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= lastDay; i++) currentMonthDays.push(i);

  return currentMonthDays;
}

function getTrailingDays(leadingDays, monthDays) {
  const trailingMonthDays = [];
  const days = 42 - (leadingDays.length + monthDays.length);
  for (let i = 1; i <= days; i++) trailingMonthDays.push(i);

  return trailingMonthDays;
}

function showMonths(currentMonth) {
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

//Event Handlers for Next/Prev Arrows
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

showMonths(currentMonth);
showCalendar(currentMonth, currentYear);
showEvents();