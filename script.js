import {createCalendar} from "./calendar.js";
import {renderMoodContainer} from "./moodContainer.js";
import {updateCalendar} from "./utils/formatting.js";


// check localStorage
let moods = JSON.parse(localStorage.getItem("moods"));
if (!moods) {
    moods = [{name:"Delete", emoji:"❌"},
            { name: "Happy", emoji: "😊"},
            { name: "Neutral", emoji: "😐"},
            { name: "Productive", emoji: "💪"},
            { name: "Stressed", emoji: "😣"}
        ];
        localStorage.setItem("moods", JSON.stringify(moods));
    }



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
		const emojiModal = document.getElementById("emoji-modal");
		if(e.target === modal) modal.style.display = `none`;
		if(e.target ===emojiModal) emojiModal.style.display = `none`;
		
	});
});

