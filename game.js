let tapCount = 0;
let targetTaps = 50;
let timeLimit = 10; // 10 seconds
let timer;
let startTime;

document.getElementById("tap-button").addEventListener("click", function() {
    if (tapCount === 0) {
        startGame();
    }
    tapCount++;
    updateProgress();
});

function startGame() {
    tapCount = 0;
    startTime = Date.now();
    timer = setTimeout(endGame, timeLimit * 1000);
}

function updateProgress() {
    let progress = (tapCount / targetTaps) * 100;
    document.getElementById("progress").style.width = progress + "%";

    let plant = document.getElementById("plant");
    plant.style.transform = `scale(${1 + tapCount / targetTaps})`;
}

function endGame() {
    let timeElapsed = (Date.now() - startTime) / 1000;
    clearTimeout(timer);

    if (tapCount >= targetTaps && (tapCount / timeElapsed) >= 5) {
        document.getElementById("message").textContent = "Congratulations! Your plant grew fully!";
        document.getElementById("plant").src = "plant-full.png"; // Change to full-grown plant
    } else {
        document.getElementById("message").textContent = "Try again! Tap faster next time!";
    }
}