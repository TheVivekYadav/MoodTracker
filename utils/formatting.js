import {createCalendar} from "../calendar.js"

export function formatDateKey(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }


export function parseMonthYear(monthYearString, dayNumber) {
    const [monthName, year] = monthYearString.split(" ");
    const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();
    return new Date(year, monthIndex, dayNumber);
}

export function updateCalendar(calendarDays) {
    const calendarContainer = document.getElementById("calendar-days");
    calendarContainer.innerHTML = ""; // Clear existing calendar
    createCalendar(calendarDays); // Re-render calendar
}
