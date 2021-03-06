"use strict";
const RUN_SPEED = 5.5;
var camPanX = 0.0;
var camPanY = 0.0;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X = p1.carX;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y = p1.carY;
let sliderX = 0;
let sliderY = 0;
const sliderMove = () => {
    var nextX = sliderX;
    var nextY = sliderY;
    if (p1.keyHeld_TurnLeft) {
        nextX += -TURN_RATE * Math.PI;
    }
    if (p1.keyHeld_TurnRight) {
        nextX += TURN_RATE * Math.PI;
    }
    if (p1.keyHeld_Gas) {
        nextY += -DRIVE_POWER;
    }
    if (p1.keyHeld_Reverse) {
        nextY += REVERSE_POWER;
    }
    if (getTrackAtPixelCoord(nextX, nextY) == false) {
        sliderX = nextX;
        sliderY = nextY;
    }
};
const sliderReset = () => {
    sliderX = canvas.width / 2;
    sliderY = canvas.height / 2;
};
const instantCamFollow = () => {
    camPanX = p1.carX - canvas.width / 2;
    camPanY = p1.carY - canvas.height / 2;
};
