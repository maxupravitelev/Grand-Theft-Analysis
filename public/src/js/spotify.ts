let urlParams: any = new URLSearchParams(window.location.search);

let spotifyID: any = urlParams.get("query") || "7HmyUTrYePMg7KlTt7W9RR";
let analysis = "";

//initialize device ID variable
let device_id_global: string = "";

// console.log(spotifyID);

if (spotifyID === null) {
  analysis = "No URI entered";
} else {
  let url = "http://localhost:8888/api/" + spotifyID;
  // console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      analysis = data;

      console.log(data);
      initAnalysis();
    });
}

let access_token: string = '';

// show login button if user is not logged in // not functional yet

if (!access_token) {
  document.write('<button onClick=handleLogin() id="loginButton"><a href="/login">login</a></button>')
} else {
  let buttonObj = document.getElementById("loginButton");
  buttonObj.remove()
}

// let access_token = urlParams.get(spotifyID);
// console.log(access_token);



fetch("http://localhost:8888/api/token")
  .then((response) => response.json())
  .then((data) => {
    access_token = data;
    console.log(access_token);
    initSpotifyPlayer();
  });

// spotify init // based on: https://developer.spotify.com/documentation/web-playback-sdk/quick-start/

const initSpotifyPlayer = () => {
    // @ts-ignore
  window.onSpotifyWebPlaybackSDKReady = () => {
      // @ts-ignore
    const player: any = new Spotify.Player({
      name: "Web Playback SDK Quick Start Player",
      getOAuthToken: (cb) => {
        cb(access_token);
      },
    });

    // Error handling
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

    // Playback status updates
    player.addListener("player_state_changed", (state) => {
      if (state.position >= 0) {
        // spotifyPlayerCurrentPosition = 0;
      }
    });

    // Ready
    player.addListener("ready", ({ device_id }) => {
      console.log("Ready with Device ID", device_id);
      device_id_global = device_id;
    });

    // Not Ready
    player.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline", device_id);
    });

    // Connect to the player!
    player.connect();
  };
};

// Spotify URI submitted @ submit.html
// let uri_from_submit = "spotify:track:7HmyUTrYePMg7KlTt7W9RR";

// initialize spotify uri variable with example uri; gets overwritten with uri_from_submit
let spotify_uri: string = "spotify:track:" + spotifyID;

// track analysis via Spotify API
let data_json: any = {
    // segments: [],
};

let segmentsDurationsArray: any[] = [];

let segmentsDurationPitchesArray: any[] = [];

const initAnalysis = () => {
  
    data_json = analysis;

    for (let i = 0; i < data_json.segments.length; i++) {
    segmentsDurationsArray.push(data_json.segments[i].duration);
    segmentsDurationPitchesArray.push(data_json.segments[i].pitches);
  }
};

const startSpotifyPlayer = () => {
  // spotify_uri = uri_from_submit;
//   console.log(spotify_uri)

  fetch(
    "https://api.spotify.com/v1/me/player/play?device_id=" + device_id_global,
    {
      method: "PUT",
      body: JSON.stringify({ uris: [spotify_uri] }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }
  ).then(() => {
    
    // start gameloop for first time
    requestAnimationFrame(gameloop);
    
    computeRGBvalueFromSpotifyAnalysis(); 

    computeCircleRadius();

    sliderReset();

    p1.carInit(carPic, "Blue Car");

    initInput();  

  })   

//   spotifyPlayerStarted = true;
};
