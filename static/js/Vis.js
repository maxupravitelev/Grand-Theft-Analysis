rgb_value = "#555555";          // initialize rgb value on start

function rgb() {

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
    if ((elapsedTime > segmentsDurationsArray[segment_duration_index]) && (segment_duration_index < segmentsDurationsArray.length - 1)) {

        // for (j = 0; j < segmentsDurationPitchesArray[segment_duration_index].length - 1; j++)
        // {
        //     setInterval(function(){ current_segment_pitch_avg = segmentsDurationPitchesArray[segment_duration_index][j];}, (segmentsDurationsArray[segment_duration_index] / 12) * 100);
        //     rgb();
        // }

        current_segment_pitch_avg = (segmentsDurationPitchesArray[segment_duration_index].reduce((a, b) => a + b, 0)) / segmentsDurationPitchesArray[segment_duration_index].length;
        rgb();
        startTime = Date.now();             // set back timer to 0
        segment_duration_index++;
    }

}

// Timer for radius value
let beat_startTime = Date.now();
let beat_elapsedTime = 0.0000;

setInterval(function () { beat_elapsedTime = (Date.now() - beat_startTime) / 1000; }, 1);

let radius_size = 200;

let beat_duration_index = 0;

function computeCircleRadius() {

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
        // const t1 = performance.now();
        // console.log(`computeCircleRadius took ${t1-t0} ms`)

    }

}