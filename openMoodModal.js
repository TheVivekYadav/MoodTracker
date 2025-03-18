import {createCalendar} from "./calendar.js";
import {parseMonthYear, formatDateKey, updateCalendar} from "./utils/formatting.js";

export function openMoodModal(selectedDate, dayNumber, x, y) {
const calendarDays = document.getElementById('calendar-days');
const monthYear = document.getElementById("month-year");


    const modalContainer = document.getElementById("mood-modal");
   // console.log(x,y);

    // Modal HTML structure
    modalContainer.innerHTML = `
        <div class="modal-content" id="modal-content">
            <div class="mood-selector" id="mood-buttons"></div>
        </div>
    `;
    const modalContent = modalContainer.querySelector("#modal-content");
    modalContent.style.top = y;
    modalContent.style.left = x;

    const moodButtonsContainer = modalContainer.querySelector("#mood-buttons");
    let selectedMood = "";
    let selectedEmoji = "";


    

    let moods = JSON.parse(localStorage.getItem("moods"));


    // Load saved mood from localStorage
    const savedMood = JSON.parse(localStorage.getItem(`mood-${formatDateKey(selectedDate)}`));
    if (savedMood) {
        selectedMood = savedMood.mood;
        selectedEmoji = savedMood.emoji;

    }
    
    moods.forEach(mood => {
        const button = document.createElement("button");
        button.classList.add("mood-btn");
        button.title = mood.name;
        button.textContent = mood.emoji;
        
        if (mood.name === selectedMood) button.classList.add("selected");
        button.addEventListener("click", () => {
            document.querySelectorAll(".mood-btn").forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
            selectedMood = mood.name;
            saveMood();
        });
        moodButtonsContainer.appendChild(button);
    });
    
    // Show the modal
    modalContainer.style.display = "block";
    modalContent.style.left = x;
    modalContent.style.top = y;
    
 

    // Save mood selection
    function saveMood() {
        let userEmoji;
        const param = `moods`;
        const moodString = localStorage.getItem(param);


        if (moodString) {
		const mood = JSON.parse(moodString);
    
        for(let i = 0; i < mood.length; i++){
            if(mood[i].name == selectedMood){
                userEmoji = mood[i].emoji;
                break;
                }
            }
        }

       //console.log(`selected mood ${selectedMood}`);
        //if(!userEmoji){
          //  userEmoji = '😂';
        //}

        const moodData = {
            date: formatDateKey(selectedDate),
            mood: selectedMood,
            emoji:userEmoji,
        };
 
        if (selectedMood == "Delete"){
            localStorage.removeItem(`mood-${formatDateKey(selectedDate)}`);
        }else{
        localStorage.setItem(`mood-${formatDateKey(selectedDate)}`, JSON.stringify(moodData));
        }console.log("Saved Mood Data:", moodData);
        modalContainer.style.display = "none";

        // Re-Render Calendar
        updateCalendar(calendarDays);
        //createCalendar(calendarDays);
    }
}

