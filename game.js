let tapCount = 0;
let targetTaps = 10;
let timeLimit = 10;
let timer;
let decayInterval;
let startTime;

document.addEventListener("DOMContentLoaded", function () {
    const tapButton = document.getElementById("tap-button");
    tapButton.addEventListener("click", function() {
        if (tapCount === 0) {
            startGame();
        }
        tapCount++;
        updateProgress();
    });
});

function startGame() {
    tapCount = 0;
    startTime = Date.now();
    document.getElementById("message").textContent = "";
    
    clearTimeout(timer);
    clearInterval(decayInterval);

    timer = setTimeout(endGame, timeLimit * 1000);
    decayInterval = setInterval(decayProgress, 1000);
}

function updateProgress() {
    let progress = (tapCount / targetTaps) * 100;
    document.getElementById("progress").style.width = progress + "%";

    let plant = document.getElementById("plant");
    
    // Scale the plant based on progress
    let scaleFactor = 1 + (tapCount / targetTaps);
    plant.style.transform = `scale(${scaleFactor})`;

    // Show full plant image when fully grown, otherwise keep seed
    if (tapCount >= targetTaps) {
        plant.src = "plant-full.png";
    }
}

function decayProgress() {
    if (tapCount > 0) {
        tapCount -= 2; // Reduce progress
        if (tapCount < 0) tapCount = 0;
        updateProgress();
    }

    let plant = document.getElementById("plant");
    if (tapCount === 0) {
        plant.src = "plant-seed.png"; // Reset to seed if progress is 0
    }
}

function endGame() {
    clearTimeout(timer);
    clearInterval(decayInterval);
    let timeElapsed = (Date.now() - startTime) / 1000;

    if (tapCount >= targetTaps && (tapCount / timeElapsed) >= 5) {
        document.getElementById("message").textContent = "Congratulations! Your plant grew fully!";
        document.getElementById("plant").src = "plant-full.png";
    } else {
        document.getElementById("message").textContent = "Try again! Tap faster next time!";
        document.getElementById("plant").src = "plant-seed.png"; // Reset to seed if failed
    }
}
