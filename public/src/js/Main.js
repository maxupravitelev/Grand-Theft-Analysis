let canvas;
let canvasContext;
let p1 = new carClass();
window.onload = () => {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    canvasContext.canvas.width = window.innerWidth;
    canvasContext.canvas.height = window.innerHeight;
    loadImages();
};
let currentTime = 0;
let deltaTime = 0;
let pastTime = new Date().getTime();
let framesPerSecond = 1 / 30;
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
    var elmnt = document.getElementById("gameCanvas");
    elmnt.scrollIntoView();
    startSpotifyPlayer();
});
document.getElementById("startFullscreen").addEventListener("click", () => {
    var elem = document.getElementById("gameCanvas");
    elem.scrollIntoView();
    var elem = document.getElementById("gameCanvas");
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    }
    else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    }
    else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    }
    else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
    startSpotifyPlayer();
});
const moveEverything = () => {
    p1.carMove();
    sliderMove();
    instantCamFollow();
};
const drawEverything = () => {
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
