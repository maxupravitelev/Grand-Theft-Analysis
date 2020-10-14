"use strict";
let greenValue = "#00AA00";
const computeGreenValue = () => {
    let R = "00";
    let G = (current_segment_pitch_avg * 255).toString();
    let B = "00";
    R = ("00" + R.toString()).slice(-2);
    G = ("00" + G.toString()).slice(-2);
    B = ("00" + B.toString()).slice(-2);
    greenValue = "#" + R + G + B;
};
let blueValue = "#0000AA";
const computeBlueValue = () => {
    let R = "00";
    let G = "00";
    let B = (current_segment_pitch_avg * 255).toString();
    R = ("00" + R.toString()).slice(-2);
    G = ("00" + G.toString()).slice(-2);
    B = ("00" + B.toString()).slice(-2);
    blueValue = "#" + R + G + B;
};
let redValue = "#AA0000";
const computeRedValue = () => {
    let R = (current_segment_pitch_avg * 255).toString();
    let G = "00";
    let B = "00";
    R = ("00" + R.toString()).slice(-2);
    G = ("00" + G.toString()).slice(-2);
    B = ("00" + B.toString()).slice(-2);
    redValue = "#" + R + G + B;
};
let current_segment_pitch_avg = 0;
let segment_duration_index = 0;
let startTime = Date.now();
let elapsedTime = 0.0;
setInterval(() => {
    elapsedTime = (Date.now() - startTime) / 1000;
}, 1);
let durationCheck = 0;
let counter = 0;
const computeRGBvalueFromSpotifyAnalysis = () => {
    if ((elapsedTime > pitchAverageInSectionArray[counter][0]) && (counter < pitchAverageInSectionArray.length - 1)) {
        console.log(pitchAverageInSectionArray[counter][0]);
        current_segment_pitch_avg = pitchAverageInSectionArray[counter][1];
        computeGreenValue();
        computeBlueValue();
        computeRedValue();
        counter++;
    }
};
let beat_startTime = Date.now();
let beat_elapsedTime = 0.0;
let radius_size = 200;
let beat_duration_index = 0;
let beatDutationTotal = 0;
const computeCircleRadius = () => {
    if (elapsedTime > data_json.beats[beat_duration_index].start &&
        beat_duration_index < data_json.beats.length - 1) {
        if (beat_duration_index % 2 == 1) {
            radius_size = 60;
        }
        else {
            radius_size = 40;
            beatDutationTotal += beat_elapsedTime;
        }
        beat_duration_index++;
    }
};
