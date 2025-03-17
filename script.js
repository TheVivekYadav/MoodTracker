import {createCalendar} from "./calendar.js";
import {renderMoodContainer} from "./moodContainer.js";

const calendarDays = document.getElementById('calendar-days');

createCalendar(calendarDays);

// Initial render of the mood container
renderMoodContainer();

