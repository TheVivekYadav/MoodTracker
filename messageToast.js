export function showToast(message, color="green", duration = 3000) {
    // Create the toast container if not already present
    let toastContainer = document.getElementById("toast-container");
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.id = "toast-container";
        document.body.appendChild(toastContainer);
    }

    // Create the toast message
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.textContent = message;
    toast.style.backgroundColor = color;

    // Append toast to the container
    toastContainer.appendChild(toast);

    // Remove toast after duration
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => {

            toast.remove();
        }, 300); // Allow fade-out animation to complete
    }, duration);
}
