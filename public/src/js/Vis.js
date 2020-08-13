let greenValue = "#00AA00";          // initialize green value on start

const computeGreenValue = () => {

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

    greenValue = "#" + R + G + B;
}

let blueValue = '#0000AA';

const computeBlueValue = () => {
    let R = '00';
    let G = '00';
    let B = current_segment_pitch_avg * 255;

    R = ('00' + R.toString(16)).slice(-2);
    G = ('00' + G.toString(16)).slice(-2);
    B = ('00' + B.toString(16)).slice(-2);

    blueValue = "#" + R + G + B;
}

let redValue = '#AA0000';

const computeRedValue = () => {
    let R = current_segment_pitch_avg * 255;
    let G = '00';
    let B = '00';

    R = ('00' + R.toString(16)).slice(-2);
    G = ('00' + G.toString(16)).slice(-2);
    B = ('00' + B.toString(16)).slice(-2);

    redValue = "#" + R + G + B;
}

let current_segment_pitch_avg = 0;

let segment_duration_index = 0;

// Timer for RGB value
let startTime = Date.now();
let elapsedTime = 0.0000;

setInterval(function () { elapsedTime = (Date.now() - startTime) / 1000; }, 1);


const computeRGBvalueFromSpotifyAnalysis = () => {
    if ((elapsedTime > segmentsDurationsArray[segment_duration_index]) && (segment_duration_index < segmentsDurationsArray.length - 1)) {



        current_segment_pitch_avg = (segmentsDurationPitchesArray[segment_duration_index].reduce((a, b) => a + b, 0)) / segmentsDurationPitchesArray[segment_duration_index].length;
        computeGreenValue();
        computeBlueValue();
        computeRedValue();
        startTime = Date.now();             // set back timer to 0
        segment_duration_index++;
    }

}

// Timer for radius value
let beat_startTime = Date.now();
let beat_elapsedTime = 0.0000;

setInterval(() => { beat_elapsedTime = (Date.now() - beat_startTime) / 1000; }, 1);

let radius_size = 200;

let beat_duration_index = 0;

const computeCircleRadius = () => {

    if ((beat_elapsedTime > data_json.beats[beat_duration_index].duration) && (beat_duration_index < data_json.beats.length - 1)) {
        if (beat_duration_index % 2 == 1) {
            radius_size += 10;
            beat_startTime = Date.now();
        }

        else {                              // (beat_duration_index % 2 == 0)
            radius_size = 40;
            beat_startTime = Date.now();
        }
        beat_duration_index++;
        // const t1 = performance.now();
        // console.log(`computeCircleRadius took ${t1-t0} ms`)

    }

}