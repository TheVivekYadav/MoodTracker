import {createCalendar} from "./calendar.js";
import {renderMoodContainer} from "./moodContainer.js";
import {updateCalendar} from "./utils/formatting.js";


createCalendar(calendarDays);

renderMoodContainer();

// Header Part Evenet Listener
document.addEventListener('DOMContentLoaded', ()=>{
	prevMonthBtn.addEventListener('click', ()=>{
		currentDate.setMonth(currentDate.getMonth() -1 );
		console.log(currentDate);
		updateCalendar(calendarDays);
	});
	
	nextMonthBtn.addEventListener('click', ()=>{
		currentDate.setMonth(currentDate.getMonth() + 1);
		console.log(currentDate);
		updateCalendar(calendarDays);
	});
	
	todayBtn.addEventListener('click', ()=>{
		const today = new Date();
		currentDate.setFullYear(today.getFullYear(), today.getMonth());
		//currentDate.setFullYear(today);
		console.log(currentDate);
		updateCalendar(calendarDays);
	});

	window.addEventListener('click', (e)=>{
		const modal = document.getElementById("mood-modal");
		if(e.target === modal){
			modal.style.display = `none`;
		}
	});
});

