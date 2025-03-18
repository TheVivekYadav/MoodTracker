import {openMoodModal} from "./openMoodModal.js";
import {formatDateKey, parseMonthYear} from "./utils/formatting.js";

const currentDate = new Date(); // return current date (Mon Mar 17 2025 18:41:06 GMT+0530 (India Standard Time))
let selectedDate = null;

const monthYear = document.getElementById("month-year");

export function createCalendar(calendarDays){
	console.log("creating Calendar");
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	
	const currentMonth = monthNames[currentDate.getMonth()];
	const currentYear = currentDate.getFullYear();

	const firstDay = new Date(currentYear, currentDate.getMonth(), 1);
	const lastDay = new Date(currentYear, currentDate.getMonth() + 1, 0);

	const startingDay = firstDay.getDay();// 0-sunday 1-monday
	const totalDays = lastDay.getDate();

	const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

	//totalDays in previous Month is startingDay - 1;

	//console.log(startingDay); Fri-6
	//console.log(startingDay-1)(5,0) total 6 times loop ko cahalana hai
	
	// for loop for previous month days 
	for(let i = startingDay - 1; i >= 0; i--){
		const dayElement = createDayElement(prevMonthLastDay - i, true);
		calendarDays.appendChild(dayElement);
	}


	// getting today date
	const today = new Date();

	// for loop for currentMonth
	for(let i = 1;i <= totalDays; i++){

		const isToday = i === today.getDate() && 
                            currentDate.getMonth() === today.getMonth() && 
                            currentDate.getFullYear() === today.getFullYear();

		const dayElement = createDayElement(i, false, isToday);
		calendarDays.appendChild(dayElement);
	}

	// for loop for next month
	const totalCells = 42; // 6rows and 7cols
	//bache kitne 
	const remaningCells = totalCells - (startingDay + totalDays); //42 - (6 + 31)
	for(let i = 1; i <= remaningCells; i++){
		const dayElement = createDayElement(i, true);
		calendarDays.appendChild(dayElement);
	}
	console.log("calendar created");
}

// this function creates element for me by taking dayNumber
function createDayElement(dayNumber, isOtherMonth, isToday = false, date=null){
	const dayElement = document.createElement('div');
	dayElement.className = 'day';


	if(isOtherMonth){
		dayElement.classList.add('other-month');
	}

	if(isToday){
		dayElement.classList.add('today');
	}

	const dayNumberElement = document.createElement('div');
	dayNumberElement.className = 'day-number';
	dayNumberElement.textContent = dayNumber;
	dayElement.appendChild(dayNumberElement);
        
	if (!isOtherMonth) {
	const emojiElement = document.createElement('span');
	emojiElement.className = 'emoji';

	const moodString = localStorage.getItem(`mood-${formatDateKey(parseMonthYear(monthYear.innerHTML, dayNumber))}`);

	if (moodString) {
		const mood = JSON.parse(moodString);
		console.log(mood); // 😊`
	emojiElement.textContent = mood.emoji;
	}
	dayElement.appendChild(emojiElement);

	// Add click event only for current month days
            dayElement.addEventListener('click', () => {
                selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber);
                openMoodModal(selectedDate, dayNumber);
            });
        }

	return dayElement;
}

