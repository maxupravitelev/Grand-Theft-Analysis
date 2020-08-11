const RUN_SPEED = 5.5;

var camPanX = 0.0;
var camPanY = 0.0;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X = p1.carX;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y = p1.carY;

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
}

const sliderReset = () => {
    // center slider on screen
    sliderX = canvas.width / 2;
    sliderY = canvas.height / 2;
}

const instantCamFollow = () => {
    camPanX = p1.carX - canvas.width / 2;
    camPanY = p1.carY - canvas.height / 2;
    // camPanX = sliderX - canvas.width/2;
    // camPanY = sliderY - canvas.height/2;
}

const cameraFollow = () => {
    var cameraFocusCenterX = camPanX + canvas.width / 2;
    var cameraFocusCenterY = camPanY + canvas.height / 2;

    var playerDistFromCameraFocusX = Math.abs(sliderX - cameraFocusCenterX);
    var playerDistFromCameraFocusY = Math.abs(sliderY - cameraFocusCenterY);

    if (playerDistFromCameraFocusX > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X) {
        if (cameraFocusCenterX < sliderX) {
            camPanX += RUN_SPEED;
        } else {
            camPanX -= RUN_SPEED;
        }
    }
    if (playerDistFromCameraFocusY > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y) {
        if (cameraFocusCenterY < sliderY) {
            camPanY += RUN_SPEED;
        } else {
            camPanY -= RUN_SPEED;
        }
    }

    //instantCamFollow();

    // this next code blocks the game from showing out of bounds
    // (this isn't required, if you don't mind seeing beyond edges)
    // if(camPanX < 0) {
    //   camPanX = 0;
    // }
    // if(camPanY < 0) {
    //   camPanY = 0;
    // }
    // var maxPanRight = TRACK_COLS * TRACK_W - canvas.width;
    // var maxPanTop = TRACK_ROWS * TRACK_H - canvas.height;
    // if(camPanX > maxPanRight) {
    //   camPanX = maxPanRight;
    // }
    // if(camPanY > maxPanTop) {
    //   camPanY = maxPanTop;
    // }
}