const queryString = window.location.search;
let userLoggedIn = false;
if (!queryString) {
    userLoggedIn = false;
}
else {
    userLoggedIn = true;
}
if (userLoggedIn == false) {
    let button = document.createElement("button");
    button.innerHTML = "Login in to spotify";
    let header = document.getElementsByTagName("header")[0];
    header.appendChild(button);
    button.addEventListener("click", () => {
        window.location.href = "/login";
    });
}
let urlParams = new URLSearchParams(window.location.search);
let spotifyID = urlParams.get("query") || "7HmyUTrYePMg7KlTt7W9RR";
let analysis = "";
let device_id_global = "";
let access_token = "";
let playerStarted = false;
let baseUrl = "https://grandtheftanalysis.herokuapp.com/";
if (userLoggedIn == true) {
    if (spotifyID === null) {
        analysis = "No URI entered";
    }
    else {
        let url = baseUrl + "api/" + spotifyID;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
            analysis = data;
            console.log(data);
            initAnalysis();
        });
    }
    fetch(baseUrl + "api/token")
        .then((response) => response.json())
        .then((data) => {
        access_token = data;
        console.log(access_token);
        initSpotifyPlayer();
    });
    const initSpotifyPlayer = () => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new Spotify.Player({
                name: "Web Playback SDK Quick Start Player",
                getOAuthToken: (cb) => {
                    cb(access_token);
                },
            });
            player.addListener("initialization_error", ({ message }) => {
                console.error(message);
            });
            player.addListener("authentication_error", ({ message }) => {
                console.error(message);
            });
            player.addListener("account_error", ({ message }) => {
                console.error(message);
            });
            player.addListener("playback_error", ({ message }) => {
                console.error(message);
            });
            player.addListener("player_state_changed", (state) => {
                console.log(state);
                if (playerStarted == false) {
                    elapsedTime = 0.0;
                    startTime = Date.now();
                    console.log("yo");
                    playerStarted = true;
                }
            });
            player.addListener("ready", ({ device_id }) => {
                console.log("Ready with Device ID", device_id);
                device_id_global = device_id;
            });
            player.addListener("not_ready", ({ device_id }) => {
                console.log("Device ID has gone offline", device_id);
            });
            player.connect();
        };
    };
}
let spotify_uri = "spotify:track:" + spotifyID;
let data_json = {};
let segmentsDurationsArray = [];
let segmentsDurationPitchesArray = [];
let duration = 0;
let pitchAverageInSectionArray = [];
const initAnalysis = () => {
    data_json = analysis;
    for (let i = 0; i < data_json.segments.length; i++) {
        segmentsDurationsArray.push(data_json.segments[i].duration);
        duration += data_json.segments[i].duration;
        segmentsDurationPitchesArray.push(data_json.segments[i].pitches);
    }
    console.log("track duration: " + duration);
    let currentTimePosition = 0.0000;
    for (let i = 0; i < data_json.segments.length; i++) {
        currentTimePosition += data_json.segments[i].duration;
        let currentAverage = data_json.segments[i].pitches.reduce((a, b) => a + b, 0) / 12;
        pitchAverageInSectionArray.push([currentTimePosition, currentAverage]);
    }
    console.log(pitchAverageInSectionArray);
};
const startSpotifyPlayer = () => {
    fetch("https://api.spotify.com/v1/me/player/play?device_id=" + device_id_global, {
        method: "PUT",
        body: JSON.stringify({ uris: [spotify_uri] }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
        },
    }).then(() => {
        requestAnimationFrame(gameloop);
        computeRGBvalueFromSpotifyAnalysis();
        computeCircleRadius();
        sliderReset();
        p1.carInit(carPic, "Blue Car");
        initInput();
    });
};
