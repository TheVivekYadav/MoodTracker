import {createCalendar} from "./calendar.js";
import {parseMonthYear, formatDateKey} from "./utils/formatting.js";

const calendarDays = document.getElementById('calendar-days');
const monthYear = document.getElementById("month-year");
let moods = JSON.parse(localStorage.getItem("moods"));
if (!moods) {
    moods = [
            { name: "Happy", emoji: "😊", color: "#4285f4" },
            { name: "Neutral", emoji: "😐", color: "#fbbc05" },
            { name: "Productive", emoji: "💪", color: "#34a853" },
            { name: "Stressed", emoji: "😣", color: "#ea4335" }
        ];
        localStorage.setItem("moods", JSON.stringify(moods));
    }

export function openMoodModal(selectedDate, dayNumber) {

    const modalContainer = document.getElementById("mood-modal");
    
    // Modal HTML structure
    modalContainer.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h3>How are you feeling today?</h3>
            <div class="mood-selector" id="mood-buttons"></div>
            <button id="save-mood">Save</button>
        </div>
    `;
    
    const closeButton = modalContainer.querySelector(".close");
    const saveButton = modalContainer.querySelector("#save-mood");
    const moodButtonsContainer = modalContainer.querySelector("#mood-buttons");
    let selectedMood = "";


    

    let moods = JSON.parse(localStorage.getItem("moods"));


    // Load saved mood from localStorage
    const savedMood = JSON.parse(localStorage.getItem(`mood-${formatDateKey(selectedDate)}`));
    if (savedMood) {
        selectedMood = savedMood.mood;
        selectedEmoji = savedMood.emoji;
    }
    
    // Populate mood buttons dynamically
    moods.forEach(mood => {
        const button = document.createElement("button");
        button.classList.add("mood-btn");
        button.style.backgroundColor = mood.color;
        button.textContent = mood.emoji + " " + mood.name;
        if (mood.name === selectedMood) button.classList.add("selected");
        button.addEventListener("click", () => {
            document.querySelectorAll(".mood-btn").forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
            selectedMood = mood.name;
        });
        moodButtonsContainer.appendChild(button);
    });
    
    // Show the modal
    modalContainer.style.display = "block";
    
    // Close modal when clicking 'X'
    closeButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });



    // Save mood selection
    saveButton.addEventListener("click", () => {
        let userEmoji;
        const param = `moods`;
        console.log(typeof param);
        const moodString = localStorage.getItem(param);


        if (moodString) {
		const mood = JSON.parse(moodString);
    
        for(let i = 0; i < mood.length; i++){
                console.log(`${mood[i].name}==${selectedMood}`)
            if(mood[i].name == selectedMood){
                userEmoji = mood[i].emoji;
                break;
                }
            }
        }

       console.log(`selected mood ${selectedMood}`);
        if(!userEmoji){
            userEmoji = '😂';
        }

        const moodData = {
            date: formatDateKey(selectedDate),
            mood: selectedMood,
            emoji:userEmoji,
        };
        localStorage.setItem(`mood-${formatDateKey(selectedDate)}`, JSON.stringify(moodData));
        console.log("Saved Mood Data:", moodData);
        modalContainer.style.display = "none";

        // Re-Render Calendar
        updateCalendar(calendarDays);
        //createCalendar(calendarDays);
    });
}

function updateCalendar(calendarDays) {
    const calendarContainer = document.getElementById("calendar-days");
    calendarContainer.innerHTML = ""; // Clear existing calendar
    createCalendar(calendarDays); // Re-render calendar
}
