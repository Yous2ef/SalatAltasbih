// Constants
const INITIAL_COUNT = 15;

// State
let count = INITIAL_COUNT;
let showReset = false;

// DOM Elements
const appContainer = document.getElementById("app-container");
const counterNumber = document.getElementById("counter-number");
const counterCircle = document.getElementById("counter-circle");
const resetButton = document.getElementById("reset-button");
const instructionText = document.getElementById("instruction-text");

// Vibrate function
function vibrate(pattern) {
    if ("vibrate" in navigator) {
        navigator.vibrate(pattern);
    }
}

// Create ripple effect
function createRipple(x, y) {
    const ripple = document.createElement("div");
    ripple.className = "ripple";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    appContainer.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Update UI
function updateUI() {
    counterNumber.textContent = count;

    if (count === 0) {
        counterCircle.classList.add("complete");
        resetButton.style.display = "block";
        instructionText.style.display = "none";
        showReset = true;
        vibrate([200, 100, 200]);
    } else {
        counterCircle.classList.remove("complete");
        resetButton.style.display = "none";
        instructionText.style.display = "block";
        showReset = false;
    }
}

// Handle tap/click
function handleTap(e) {
    if (count > 0 && e.target !== resetButton) {
        count--;
        vibrate(30);

        const rect = appContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        createRipple(x, y);

        updateUI();
    }
}

// Handle reset
function handleReset(e) {
    e.stopPropagation();
    count = INITIAL_COUNT;
    vibrate(50);
    updateUI();
}

// Event listeners
appContainer.addEventListener("click", handleTap);
resetButton.addEventListener("click", handleReset);

// Initialize
updateUI();
