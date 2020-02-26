# eCalendar

This app is a project submission for the Tier 1 Solo project.  The objective was to clone a calendar app based off a few images and a list of requirements.

The current implementation is hosted on Github pages and can be [viewed here](https://cgefx.github.io/eCalendar/).

## Functionality

### Calendar

- The app is currently able to render the current month, as well as go backward and forward through months by clicking on the left and right **arrow** icons.  

- The current month is displayed in **bold**, as is the current day of the week
  
- The blue/green circle tracks the current day.

- Weekend days are displayed in an *off* green color

- Any numerical days displayed that are not in the current month are **greyed** out.

### Events Section

- The dates will remain current to "today", even while cycling through months in the calendar.

- The event list data is not dynamic, though it is scroll-able.

### Modal

- Clicking the "Add an event" button will display a modal.

- The "Event" header is a text input for entering the name of an event. The text will change from blue to black indicating user input.

- Clicking "Month" and "Day" revels dropdown selections for entering the event times.

- Clicking the button will not submit data. It just closes the modal.  As does clicking the button in the upper right, or anywhere off of the modal itself.

- The icons on the left currently have no functionality.

## Running the site

This is a static page with no live server and no dependencies.

To run it locally, simply clone the repo and open index.html in your browser.

## Future plans

- [ ] Implement responsive layout.
- [ ] Implement remaining event entry fields in the modal.
- [ ] Connect saved events to backend.
- [ ] Render saved events in event list.
