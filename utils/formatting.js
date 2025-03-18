export function formatDateKey(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }


export function parseMonthYear(monthYearString, dayNumber) {
    const [monthName, year] = monthYearString.split(" ");
    const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();
    return new Date(year, monthIndex, dayNumber);
}
