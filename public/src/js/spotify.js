let userLoggedIn = false;
if (userLoggedIn == false) {
    document.write('<button onClick=handleLogin()><a href="/login">login</a></button>');
    userLoggedIn = true;
}
else {
    console.log("logged in");
    document.write('<strong>user is logged id</strong>');
}
const handleLogin = () => {
    console.log("logged in");
    document.write('<strong>user is logged id</strong>');
};
let urlParams = new URLSearchParams(window.location.search);
let spotifyID = urlParams.get("query") || "7HmyUTrYePMg7KlTt7W9RR";
let analysis = "";
let device_id_global = "";
if (spotifyID === null) {
    analysis = "No URI entered";
}
else {
    let url = "http://localhost:8888/api/" + spotifyID;
    console.log(url);
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
        analysis = data;
        console.log(data);
        initAnalysis();
    });
}
let access_token = '';
fetch("http://localhost:8888/api/token")
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
            if (state.position >= 0) {
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
let spotify_uri = "spotify:track:" + spotifyID;
let data_json = {};
let segmentsDurationsArray = [];
let segmentsDurationPitchesArray = [];
const initAnalysis = () => {
    data_json = analysis;
    for (let i = 0; i < data_json.segments.length; i++) {
        segmentsDurationsArray.push(data_json.segments[i].duration);
        segmentsDurationPitchesArray.push(data_json.segments[i].pitches);
    }
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
