const GROUNDSPEED_DECAY_MULT = 0.98;
const DRIVE_POWER = 0.45;
const REVERSE_POWER = DRIVE_POWER / 1;
const TURN_RATE = 0.038;
const MIN_TURN_SPEED = 2;
const MAX_SPEED = 30;
const MAX_REVERSE_SPEED = -10;
let reverse = false;
class carClass {
    constructor() {
        this.carX = 75;
        this.carY = 75;
        this.keyHeld_Gas = false;
        this.keyHeld_Reverse = false;
        this.keyHeld_TurnLeft = false;
        this.keyHeld_TurnRight = false;
        this.setupControls = (forwardKey, backKey, leftKey, rightKey) => {
            this.controlKeyForGas = forwardKey;
            this.controlKeyForReverse = backKey;
            this.controlKeyForTurnLeft = leftKey;
            this.controlKeyForTurnRight = rightKey;
        };
        this.carInit = (whichGraphic, whichName) => {
            this.myBitmap = whichGraphic;
            this.myName = whichName;
            this.carReset();
        };
        this.carReset = () => {
            this.carSpeed = 0;
            this.carAng = -0.5 * Math.PI;
            if (this.homeX == undefined) {
                for (var i = 0; i < trackGrid.length; i++) {
                    if (trackGrid[i] == TRACK_PLAYER) {
                        var tileRow = Math.floor(i / TRACK_COLS);
                        var tileCol = i % TRACK_COLS;
                        this.homeX = tileCol * TRACK_W + 0.5 * TRACK_W;
                        this.homeY = tileRow * TRACK_H + 0.5 * TRACK_H;
                        trackGrid[i] = TRACK_ROAD;
                        break;
                    }
                }
            }
            this.carX = this.homeX;
            this.carY = this.homeY;
        };
        this.carMove = () => {
            if (Math.abs(this.carSpeed) > MIN_TURN_SPEED) {
                if (this.keyHeld_TurnLeft && reverse == false) {
                    this.carAng -= TURN_RATE * Math.PI;
                }
                if (this.keyHeld_TurnLeft && reverse == true) {
                    this.carAng += TURN_RATE * Math.PI;
                }
                if (this.keyHeld_TurnRight && reverse == false) {
                    this.carAng += TURN_RATE * Math.PI;
                }
                if (this.keyHeld_TurnRight && reverse == true) {
                    this.carAng -= TURN_RATE * Math.PI;
                }
            }
            if (this.keyHeld_Gas) {
                if (this.carSpeed < MAX_SPEED) {
                    this.carSpeed += DRIVE_POWER;
                    reverse = false;
                }
                else {
                    this.carSpeed += 0;
                }
            }
            if (this.keyHeld_Reverse) {
                if (this.carSpeed > MAX_REVERSE_SPEED) {
                    this.carSpeed -= REVERSE_POWER;
                    reverse = true;
                }
                this.carSpeed -= 0;
            }
            var nextX = this.carX + Math.cos(this.carAng) * this.carSpeed;
            var nextY = this.carY + Math.sin(this.carAng) * this.carSpeed;
            var drivingIntoTileType = getTrackAtPixelCoord(nextX, nextY);
            if (drivingIntoTileType == TRACK_ROAD) {
                this.carX = nextX;
                this.carY = nextY;
            }
            else {
                this.carSpeed += 0.0;
            }
            this.carSpeed *= GROUNDSPEED_DECAY_MULT;
        };
        this.carDraw = () => {
            drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.carX, this.carY, this.carAng);
        };
    }
}
