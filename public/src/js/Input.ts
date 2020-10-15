// keyboard keycode constants, determined by printing out evt.keyCode from a key handler
const KEY_LEFT_ARROW: number = 37;
const KEY_UP_ARROW: number = 38;
const KEY_RIGHT_ARROW: number = 39;
const KEY_DOWN_ARROW: number = 40;

const initInput = () => {
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);

  p1.setupControls(
    KEY_UP_ARROW,
    KEY_DOWN_ARROW,
    KEY_LEFT_ARROW,
    KEY_RIGHT_ARROW
  );
};

const setKeyHoldState = (thisKey: number, thisCar: any, setTo: Boolean) => {
  if (thisKey == thisCar.controlKeyForTurnLeft) {
    thisCar.keyHeld_TurnLeft = setTo;
  }
  if (thisKey == thisCar.controlKeyForTurnRight) {
    thisCar.keyHeld_TurnRight = setTo;
  }
  if (thisKey == thisCar.controlKeyForGas) {
    thisCar.keyHeld_Gas = setTo;
  }
  if (thisKey == thisCar.controlKeyForReverse) {
    thisCar.keyHeld_Reverse = setTo;
  }
};

const keyPressed = (evt: any) => {
  setKeyHoldState(evt.keyCode, p1, true);
  evt.preventDefault(); // without this, arrow keys scroll the browser!
};

const keyReleased = (evt: any) => {
  setKeyHoldState(evt.keyCode, p1, false);
};
