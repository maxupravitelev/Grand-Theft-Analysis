"use strict";
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
    let gameCanvas = document.getElementById("gameCanvas");
    gameCanvas.scrollIntoView();
    startSpotifyPlayer();
});
document.getElementById("startFullscreen").addEventListener("click", () => {
    let gameCanvas = document.getElementById("gameCanvas");
    if (gameCanvas.requestFullscreen) {
        gameCanvas.requestFullscreen();
    }
    else if (gameCanvas.mozRequestFullScreen) {
        gameCanvas.mozRequestFullScreen();
    }
    else if (gameCanvas.webkitRequestFullscreen) {
        gameCanvas.webkitRequestFullscreen();
    }
    else if (gameCanvas.msRequestFullscreen) {
        gameCanvas.msRequestFullscreen();
    }
    startSpotifyPlayer();
});
document.getElementById("startDev").addEventListener("click", () => {
    var gameCanvas = document.getElementById("gameCanvas");
    gameCanvas.scrollIntoView();
    initAnalysis(dummyData);
    startGame();
});
const startGame = () => {
    requestAnimationFrame(gameloop);
    computeRGBvalueFromSpotifyAnalysis();
    computeCircleRadius();
    sliderReset();
    p1.carInit(carPic, "Blue Car");
    initInput();
};
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
    canvasContext.font = "15px Arial";
    canvasContext.fillText("carX: " + p1.carX, 10, 70);
    canvasContext.fillText("carX: " + p1.carX, 10, 85);
};
