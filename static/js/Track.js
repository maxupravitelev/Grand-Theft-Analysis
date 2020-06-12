
// track constants and variables
const TRACK_W = 600
const TRACK_H = 600
const TRACK_GAP = 1;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
var trackGrid =
[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYER = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;

function trackTileToIndex(tileCol, tileRow) 
{
    return (tileCol + TRACK_COLS*tileRow);
}

function isTrackAtTileCoord(trackTileCol, trackTileRow) 
{
    var trackIndex = trackTileToIndex(trackTileCol, trackTileRow);
    return (trackGrid[trackIndex] == 1);
}

function getTrackAtPixelCoord(pixelX,pixelY) 
{ 
    var tileCol = pixelX/ TRACK_W;
    var tileRow = pixelY/ TRACK_H;
  
    // we'll use Math.floor to round down to the nearest whole number
    tileCol = Math.floor( tileCol );
    tileRow = Math.floor( tileRow );

    // first check whether the car is within any part of the track wall
    if(tileCol < 0 || tileCol >= TRACK_COLS ||
    tileRow < 0 || tileRow >= TRACK_ROWS) 
    {
    return false;
    //  return TRACK_WALL; // avoid invalid array access, treat out of bounds as wall
    }
    var trackIndex = trackTileToIndex(tileCol, tileRow);
    return trackGrid[trackIndex];
}

rgb_value = "#555555";          // initialize rgb value on start

function rgb() 
{

    ///////////// compute RGB  
    // let R = Math.round(Math.random() * 255);
    // let G = Math.round(Math.random() * 255);
    // let B = Math.round(Math.random() * 255);

    let R = '00';
    let G = current_segment_pitch_avg * 255;
    let B = '00';

    R = ('00' + R.toString(16)).slice(-2);
    G = ('00' + G.toString(16)).slice(-2);
    B = ('00' + B.toString(16)).slice(-2);

    rgb_value = "#" + R + G + B;

    return "#" + R + G + B; 
}



let current_segment_pitch_avg = 0;

let segment_duration_index = 0;

// Timer for RGB value
let startTime = Date.now();
let elapsedTime = 0.0000;

setInterval(function () { elapsedTime = (Date.now() - startTime) / 1000; }, 1);



function computeRGBvalueFromFlaskData() {

    if (Object.keys(data_json).length != 0) {
        api_loaded = true;
    }

    if (api_loaded == true) {
        if ((elapsedTime > data_json.segments[segment_duration_index].duration) && (segment_duration_index < data_json.segments.length - 1)) {
            current_segment_pitch_avg = (data_json.segments[segment_duration_index].pitches.reduce((a, b) => a + b, 0)) / data_json.segments[segment_duration_index].pitches.length;
            rgb();
            startTime = Date.now();             // set back timer to 0
            segment_duration_index++;
        }
    }
}

// Timer for radius value
let beat_startTime = Date.now();
let beat_elapsedTime = 0.0000;

setInterval(function () { beat_elapsedTime = (Date.now() - beat_startTime) / 1000; }, 1);

let radius_size = 200;

let beat_duration_index = 0;

function computeCircleRadius() {


    if (Object.keys(data_json).length != 0) {
        api_loaded = true;
    }

    if (api_loaded == true) {

        if ((beat_elapsedTime > data_json.beats[beat_duration_index].duration) && (beat_duration_index < data_json.beats.length - 1)) {
            if (beat_duration_index % 2 == 1) {
                radius_size += 20;
                beat_startTime = Date.now();
            }

            else {                              // (beat_duration_index % 2 == 0)
                radius_size = 120;
                beat_startTime = Date.now();
            }
            beat_duration_index++;
        }
    }
}

function drawTracks() {

    for(var eachCol=0; eachCol<TRACK_COLS; eachCol++) 
    { // in each column...
        for(var eachRow=0; eachRow<TRACK_ROWS; eachRow++) 
        { // in each row within that col
            if( isTrackAtTileCoord(eachCol, eachRow) ) 
            {
                var trackLeftEdgeX = eachCol * TRACK_W;
                var trackTopEdgeY = eachRow * TRACK_H;
                colorCircle(8170, 1600, radius_size, rgb_value)
                colorRect(trackLeftEdgeX, trackTopEdgeY,
                TRACK_W - TRACK_GAP, TRACK_H - TRACK_GAP, rgb_value);
                canvasContext.drawImage(roof, trackLeftEdgeX, trackTopEdgeY);

            } // end of isTrackAtTileCoord()
        } // end of for eachRow
    } // end of for eachCol
} // end of drawTracks()
