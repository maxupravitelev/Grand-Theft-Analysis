// let userLoggedIn = false;

// if (userLoggedIn == false) {
//     document.write('<button onClick=handleLogin()><a href="/login">login</a></button>')
//     userLoggedIn = true;
// } else {
//     console.log("logged in")
//     document.write('<strong>user is logged id</strong>')
// }

// const handleLogin = () => {
//     console.log("logged in")
//     document.write('<strong>user is logged id</strong>')
// }

let urlParams = new URLSearchParams(window.location.search);

let spotifyID = urlParams.get("query") || "4zTqkKfNC3rDQ0uuAGOvie";
let analysis = "";

console.log(spotifyID);

// if (spotifyID === null) {
//   analysis = "No URI entered";
// } else {
//   let url = "http://localhost:8888/api/" + spotifyID;
//   console.log(url);
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       analysis = data;
//       console.log(data);
//     });
// }



// document.write(analysis);

// const postToServer = () => {
//     console.log("sf")
// }

let access_token = urlParams.get("access_token");
console.log(access_token);

// fetch("http://localhost:8888/api/token")
//   .then((response) => response.json())
//   .then((data) => {
//     access_token = data;
//     console.log(access_token);
//   });

// // spotify init // based on: https://developer.spotify.com/documentation/web-playback-sdk/quick-start/

// window.onSpotifyWebPlaybackSDKReady = () => {
//   const token = access_token;
//   console.log(token);
//   const player = new Spotify.Player({
//     name: "Web Playback SDK Quick Start Player",
//     getOAuthToken: (cb) => {
//       cb(token);
//     },
//   });

//   // Error handling
//   player.addListener("initialization_error", ({ message }) => {
//     console.error(message);
//   });
//   player.addListener("authentication_error", ({ message }) => {
//     console.error(message);
//   });
//   player.addListener("account_error", ({ message }) => {
//     console.error(message);
//   });
//   player.addListener("playback_error", ({ message }) => {
//     console.error(message);
//   });

//   // Playback status updates
//   player.addListener("player_state_changed", (state) => {
//     console.log(state);
//   });

//   // Ready
//   player.addListener("ready", ({ device_id }) => {
//     console.log("Ready with Device ID", device_id);
//   });

//   // Not Ready
//   player.addListener("not_ready", ({ device_id }) => {
//     console.log("Device ID has gone offline", device_id);
//   });

//   // Connect to the player!
//   player.connect();
// };
