export function renderMoodContainer() {
    const moodContainer = document.querySelector(".mood-container");
    moodContainer.innerHTML = "";
    
    const moods = JSON.parse(localStorage.getItem("moods")) || [
        { name: "Happy", emoji: "😊", color: "#4285f4" },
        { name: "Neutral", emoji: "😐", color: "#fbbc05" },
        { name: "Productive", emoji: "💪", color: "#34a853" },
        { name: "Stressed", emoji: "😣", color: "#ea4335" }
    ];
    
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
        const newMoodColor = prompt("Enter mood color (hex or name):");
        
        if (newMoodName && newMoodEmoji && newMoodColor) {
            moods.push({ name: newMoodName, emoji: newMoodEmoji, color: newMoodColor });
            localStorage.setItem("moods", JSON.stringify(moods));
            renderMoodContainer();
        }
    });
    
    moodContainer.appendChild(addMoodButton);
}


