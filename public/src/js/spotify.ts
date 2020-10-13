const queryString = window.location.search;

let userLoggedIn = false;

if (!queryString) {
  userLoggedIn = false;
} else {
  userLoggedIn = true;
}

if (userLoggedIn == false) {
  // Create the button for loggin in
  let button = document.createElement("button");
  button.innerHTML = "Login in to spotify";

  let header = document.getElementsByTagName("header")[0];
  header.appendChild(button);

  button.addEventListener("click", () => {
    window.location.href = "/login";
  });
}

let urlParams: any = new URLSearchParams(window.location.search);
// console.log(urlParams);

let spotifyID: any = urlParams.get("query") || "7HmyUTrYePMg7KlTt7W9RR";
let analysis = "";

//initialize device ID variable
let device_id_global: string = "";

// console.log(spotifyID);

let access_token: string = "";

let playerStarted: Boolean = false;

let baseUrl = "http://localhost:8888/"
// let baseUrl = "https://grandtheftanalysis.herokuapp.com/"

if (userLoggedIn == true) {
  if (spotifyID === null) {
    analysis = "No URI entered";
  } else {
    let url = baseUrl + "api/" + spotifyID;
    // console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // analysis = data;

        // console.log(data);
        initAnalysis(data);
      });
  }


  fetch(baseUrl + "api/token")
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
        console.log(state)
        if (playerStarted == false) {
          elapsedTime = 0.0
          startTime = Date.now();
          console.log("yo")
          playerStarted = true;
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
}

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

let duration: number = 0;


// let timePositionPitchArray: any[] = [];

let pitchAverageInSectionArray: any[] = [];

const initAnalysis = (trackData) => {
  data_json = trackData;

  console.log(trackData)

  for (let i = 0; i < trackData.segments.length; i++) {
    segmentsDurationsArray.push(trackData.segments[i].duration);
    duration += trackData.segments[i].duration;
    segmentsDurationPitchesArray.push(trackData.segments[i].pitches);
  }
  console.log("track duration: " + duration)

  let currentTimePosition: number = 0.0000;

  for (let i = 0; i < trackData.segments.length; i++) {
      currentTimePosition += trackData.segments[i].duration;
      let currentAverage:number = trackData.segments[i].pitches.reduce((a:number, b:number) => a + b, 0 ) / 12;
      pitchAverageInSectionArray.push([currentTimePosition, currentAverage])
  }

  // console.log(pitchAverageInSectionArray)

  // for (let i = 0; i < trackData.segments.length; i++) {
  
  //   for (let j = 0; j < trackData.segments[i].pitches.length; j++) {
  //     currentTimePosition += trackData.segments[i].duration / trackData.segments[i].pitches.length;
  //     timePositionPitchArray.push([currentTimePosition, trackData.segments[i].pitches[j]])
  // }
  // }


};

const startSpotifyPlayer = () => {

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
  });

};
