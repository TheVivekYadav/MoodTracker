export function renderMoodContainer() {
    const moodContainer = document.querySelector(".mood-container");
    moodContainer.innerHTML = "";
    
    const moods = JSON.parse(localStorage.getItem("moods"));
    
    moods.forEach(mood => {
        const moodItem = document.createElement("div");
        moodItem.classList.add("mood-item");
        moodItem.innerHTML = `
            <div class="mood-emoji" style="background-color: ${mood.color};">${mood.emoji}</div>
            <span>${mood.name}</span>
        `;
        moodContainer.appendChild(moodItem);
    });
    
    const addMoodButton = document.createElement("button");
    addMoodButton.textContent = "+";
    addMoodButton.classList.add("add-mood-btn");
    addMoodButton.addEventListener("click", () => {
        const newMoodName = prompt("Enter mood name:");
        const newMoodEmoji = prompt("Enter mood emoji:");
        
        if (newMoodName && newMoodEmoji) {
            moods.push({ name: newMoodName, emoji: newMoodEmoji});
            localStorage.setItem("moods", JSON.stringify(moods));
            renderMoodContainer();
        }
    });
    
    moodContainer.appendChild(addMoodButton);
}


