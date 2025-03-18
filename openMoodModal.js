import {createCalendar} from "./calendar.js";
import {parseMonthYear, formatDateKey, updateCalendar} from "./utils/formatting.js";
import {renderMoodContainer} from "./moodContainer.js";
import {showToast} from "./messageToast.js";

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
            console.log(selectedMood );console.log( selectedEmoji);
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
 
        if (selectedMood == "Delete" && selectedEmoji){
            localStorage.removeItem(`mood-${formatDateKey(selectedDate)}`);
            showToast("Deleted","red");
        }else if(selectedMood != "Delete"){
        localStorage.setItem(`mood-${formatDateKey(selectedDate)}`, JSON.stringify(moodData));
        showToast("Mood added to Calendar");
        }
        modalContainer.style.display = "none";

        // Re-Render Calendar
        updateCalendar(calendarDays);
        //createCalendar(calendarDays);
    }
}

export function openAddMoodModal(x, y){
    const modalContainer = document.getElementById("input-mode-modal");
    modalContainer.innerHTML = "";
    
    modalContainer.innerHTML = `
        <div class="modal-box" style="top: ${y}; left: ${x};">
            <input type="text" id="mood-name" placeholder="Enter mood name...">
            <input type="text" id="mood-emoji" placeholder="Enter mood emoji...">
            <button id="submit-mood">Add Mood</button>
        </div>
    `;

    document.getElementById("submit-mood").addEventListener("click", () => {
            const newMoodName = document.getElementById("mood-name").value;
            const newMoodEmoji = document.getElementById("mood-emoji").value;
            modalContainer.innerHTML = "";
    
     if (newMoodName && newMoodEmoji) {
            const moods = JSON.parse(localStorage.getItem("moods"));
            if(!moods){
                alert("Unable to add Mood");
            }else{
            moods.push({ name: newMoodName, emoji: newMoodEmoji});
            localStorage.setItem("moods", JSON.stringify(moods));
            renderMoodContainer();}
            showToast("Mood Added Success fully");
        }
        });
}
