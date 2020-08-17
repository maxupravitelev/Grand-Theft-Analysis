// track constants and variables
const TRACK_W = 600;
const TRACK_H = 600;
const TRACK_GAP = 1;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
var trackGrid = [
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  0,
  0,
  0,
  0,
  1,
  1,
  0,
  0,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  0,
  0,
  1,
  1,
  0,
  1,
  1,
  0,
  0,
  0,
  1,
  1,
  1,
  0,
  0,
  0,
  1,
  1,
  0,
  1,
  0,
  0,
  1,
  1,
  0,
  0,
  0,
  0,
  1,
  1,
  0,
  0,
  1,
  0,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  0,
  0,
  1,
  0,
  1,
  0,
  1,
  1,
  0,
  0,
  0,
  1,
  0,
  1,
  0,
  1,
  1,
  0,
  0,
  1,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  1,
  0,
  1,
  1,
  1,
  0,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  1,
  1,
  1,
  0,
  1,
  0,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  1,
  0,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  0,
  1,
  0,
  0,
  1,
  0,
  1,
  1,
  0,
  1,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  1,
  0,
  1,
  0,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
];
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYER = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;

const trackTileToIndex = (tileCol, tileRow) => {
  return tileCol + TRACK_COLS * tileRow;
};

const isTrackAtTileCoord = (trackTileCol, trackTileRow) => {
  var trackIndex = trackTileToIndex(trackTileCol, trackTileRow);
  return trackGrid[trackIndex] == 1;
};

const getTrackAtPixelCoord = (pixelX, pixelY) => {
  var tileCol = pixelX / TRACK_W;
  var tileRow = pixelY / TRACK_H;

  // we'll use Math.floor to round down to the nearest whole number
  tileCol = Math.floor(tileCol);
  tileRow = Math.floor(tileRow);

  // first check whether the car is within any part of the track wall
  if (
    tileCol < 0 ||
    tileCol >= TRACK_COLS ||
    tileRow < 0 ||
    tileRow >= TRACK_ROWS
  ) {
    return false;
    //  return TRACK_WALL; // avoid invalid array access, treat out of bounds as wall
  }
  var trackIndex = trackTileToIndex(tileCol, tileRow);
  return trackGrid[trackIndex];
};

var currentRGBvalue = "#23FF12";
let activeColor = "blue";

const colorizeTracks = () => {
  let blueCircleX = 9500;
  let blueCircleY = 890;

  let greenCircleX = 9900;
  let greenCircleY = 890;

  let redCircleX = 10300;
  let redCircleY = 890;

  if (
    p1.carX > blueCircleX &&
    p1.carX < blueCircleX + radius_size / 2 &&
    p1.carY > blueCircleY &&
    p1.carY < blueCircleY + radius_size / 2
  ) {
    activeColor = "blue";
  }
  if (activeColor == "blue") {
    currentRGBvalue = blueValue;
  }

  if (
    p1.carX > greenCircleX &&
    p1.carX < greenCircleX + radius_size / 2 &&
    p1.carY > greenCircleY &&
    p1.carY < greenCircleY + radius_size / 2
  ) {
    activeColor = "green";
  }

  if (activeColor == "green") {
    currentRGBvalue = greenValue;
  }

  if (
    p1.carX > redCircleX &&
    p1.carX < redCircleX + radius_size / 2 &&
    p1.carY > redCircleY &&
    p1.carY < redCircleY + radius_size / 2
  ) {
    activeColor = "red";
  }

  if (activeColor == "red") {
    currentRGBvalue = redValue;
  }

  colorCircle(blueCircleX, blueCircleY, radius_size, blueValue);
  colorCircle(greenCircleX, greenCircleY, radius_size, greenValue);
  colorCircle(redCircleX, redCircleY, radius_size, redValue);
};

const drawTracks = () => {
  for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
    // in each column...
    for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
      // in each row within that col
      if (isTrackAtTileCoord(eachCol, eachRow)) {
        var trackLeftEdgeX = eachCol * TRACK_W;
        var trackTopEdgeY = eachRow * TRACK_H;

        colorRect(
          trackLeftEdgeX,
          trackTopEdgeY,
          TRACK_W - TRACK_GAP,
          TRACK_H - TRACK_GAP,
          currentRGBvalue
        );
        canvasContext.drawImage(roof, trackLeftEdgeX, trackTopEdgeY);
      } // end of isTrackAtTileCoord()
    } // end of for eachRow
  } // end of for eachCol
}; // end of drawTracks()
