import {openAddMoodModal} from "./openMoodModal.js";

export function renderMoodContainer() {
    const moodContainer = document.querySelector(".mood-container");
    moodContainer.innerHTML = "";
    
    const moods = JSON.parse(localStorage.getItem("moods"));
    
    for(let i = 0;i<moods.length;i++){
        if (i > 3){
            break;
        }
        const moodItem = document.createElement("div");
        moodItem.classList.add("mood-item");
        moodItem.innerHTML = `
            <div class="mood-emoji" style="background-color: ${moods[i].color};">${moods[i].emoji}</div>
            <span>${moods[i].name}</span>
        `;
        moodContainer.appendChild(moodItem);
    };
    
    const addMoodButton = document.createElement("button");
    addMoodButton.textContent = "+";
    addMoodButton.classList.add("add-mood-btn");
    addMoodButton.addEventListener("click", (e) => {
        openAddMoodModal(`${e.clientX}px`, `${e.clientY}px`);
        //const newMoodName = prompt("Enter mood name:");
        //const newMoodEmoji = prompt("Enter mood emoji:");
        ///
        /*
        console.log(newMoodName, newMoodEmoji);
        if (newMoodName && newMoodEmoji) {
            moods.push({ name: newMoodName, emoji: newMoodEmoji});
            localStorage.setItem("moods", JSON.stringify(moods));
            renderMoodContainer();
        }*/
    });
    
    moodContainer.appendChild(addMoodButton);
}


