let canvas;
let canvasContext;
let p1 = new carClass();
window.onload = () => {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    canvasContext.canvas.width = 1280;
    canvasContext.canvas.height = 720;
    loadImages();
};
let currentTime = 0;
let deltaTime = 0;
let pastTime = new Date().getTime();
let framesPerSecond = 1 / 60;
const gameloop = () => {
    currentTime = new Date().getTime();
    deltaTime = deltaTime + Math.min(1, (currentTime - pastTime) / 1000);
    while (deltaTime > framesPerSecond) {
        deltaTime = deltaTime - framesPerSecond;
        moveEverything();
    }
    drawEverything();
    pastTime = currentTime;
    requestAnimationFrame(gameloop);
};
document.getElementById("startButton").addEventListener("click", () => {
    startSpotifyPlayer();
});
const moveEverything = () => {
    p1.carMove();
    sliderMove();
    instantCamFollow();
};
const drawEverything = () => {
    computeRGBvalueFromSpotifyAnalysis();
    computeCircleRadius();
    colorRect(0, 0, canvas.width, canvas.height, "black");
    canvasContext.save();
    canvasContext.translate(-camPanX, -camPanY);
    drawTracks();
    colorizeTracks();
    p1.carDraw();
    canvasContext.restore();
    canvasContext.fillStyle = "white";
    canvasContext.font = "20px Arial";
    canvasContext.fillText("Counter: " + elapsedTime, 10, 50);
};
