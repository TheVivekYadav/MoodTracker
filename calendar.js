import {openMoodModal} from "./openMoodModal.js";
import {formatDateKey, parseMonthYear} from "./utils/formatting.js";
import {formatXY} from "./utils/formatXY.js";
let selectedDate = null;


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

	const weekDays = [
		'Sun',
		'Mon',
		'Tue',
		'Wed',
		'Thu',
		'Fri',
		'Sat'
	];

	const fullWeekDays = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	]
	
	const currentMonth = monthNames[currentDate.getMonth()];
	const currentYear = currentDate.getFullYear();

	const firstDay = new Date(currentYear, currentDate.getMonth(), 1);
	const lastDay = new Date(currentYear, currentDate.getMonth() + 1, 0);

	const startingDay = firstDay.getDay();// 0-sunday 1-monday
	const totalDays = lastDay.getDate();

	const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();


	monthYear.innerHTML = `${currentMonth} ${currentYear}`;



	// Legends 
	for (let i = 0; i < 7; i++){
		const dayElement = createDayElement(weekDays[i], false, false, null, true);
		dayElement.title = `${fullWeekDays[i]}`;
		calendarDays.appendChild(dayElement);
	}

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
function createDayElement(dayNumber, isOtherMonth, isToday = false, date=null, isLegend=false){
	const dayElement = document.createElement('div');
	dayElement.className = 'day';


	if(isLegend){
		dayElement.id = 'week-day-legend';
		const content = document.createElement('h1');
		content.textContent = dayNumber;
		dayElement.appendChild(content);
	}

	if(isOtherMonth){
		dayElement.classList.add('other-month');
	}

	if(isToday){
		dayElement.classList.add('today');
	}
	
	if(!isLegend){
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
            dayElement.addEventListener('click', (e) => {
                selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber);
                openMoodModal(selectedDate, dayNumber, `${e.clientX}`,`${e.clientY}`);
            });
		}
        }

	return dayElement;
}

