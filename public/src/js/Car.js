// car tuning constants
const GROUNDSPEED_DECAY_MULT = 0.98;
const DRIVE_POWER = 0.19;
const REVERSE_POWER = DRIVE_POWER / 3;
const TURN_RATE = 0.013;
const MIN_TURN_SPEED = 0.5;
const MAX_SPEED = 20;
const MAX_REVERSE_SPEED = -5;
let reverse = false;
function carClass() {
    // variables to keep track of car position
    this.carX = 75;
    this.carY = 75;
    // keyboard hold state variables, to use keys more like buttons
    this.keyHeld_Gas = false;
    this.keyHeld_Reverse = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_TurnRight = false;
    // key controls used for this car 
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
                    break; // found it, so no need to keep searching 
                } // end of if
            } // end of for
        } // end of if car position not saved yet
        this.carX = this.homeX;
        this.carY = this.homeY;
    }; // end of carReset
    this.carMove = () => {
        // only allow the car to turn while it's rolling
        if (Math.abs(this.carSpeed) > MIN_TURN_SPEED) {
            if ((this.keyHeld_TurnLeft) && (reverse == false)) {
                this.carAng -= TURN_RATE * Math.PI;
            }
            if ((this.keyHeld_TurnLeft) && (reverse == true)) {
                this.carAng += TURN_RATE * Math.PI;
            }
            if ((this.keyHeld_TurnRight) && (reverse == false)) {
                this.carAng += TURN_RATE * Math.PI;
            }
            if ((this.keyHeld_TurnRight) && (reverse == true)) {
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
        // console.log("nextX " + nextX);
        // console.log("nextY " + nextY);
        // console.log("p1.carX " + p1.carX);
        // console.log("p1.carY " + p1.carY);
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
        //console.log(reverse)
    };
} // end of car class
