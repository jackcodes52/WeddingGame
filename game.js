let tapCount = 0;
let targetTaps = 50;
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
    plant.style.transform = `scale(${1 + tapCount / targetTaps})`;

    // Change plant image when fully grown
    if (tapCount >= targetTaps) {
        plant.src = "full-plant.png"; // Swap to the final plant image
    }
}

function decayProgress() {
    if (tapCount > 0) {
        tapCount -= 2; // Progress decays when not tapping
        if (tapCount < 0) tapCount = 0;
        updateProgress();
    }
}

function endGame() {
    clearTimeout(timer);
    clearInterval(decayInterval);
    let timeElapsed = (Date.now() - startTime) / 1000;

    if (tapCount >= targetTaps && (tapCount / timeElapsed) >= 5) {
        document.getElementById("message").textContent = "Congratulations! Your plant grew fully!";
        document.getElementById("plant").src = "full-plant.png"; // Ensure full-grown plant shows at the end
    } else {
        document.getElementById("message").textContent = "Try again! Tap faster next time!";
        document.getElementById("plant").src = "small-plant.png"; // Reset to small plant if failed
    }
}
