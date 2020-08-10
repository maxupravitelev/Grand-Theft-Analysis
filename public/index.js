let urlParams = new URLSearchParams(window.location.search);

let spotifyID = urlParams.get('query')
let analysis = ''

console.log(spotifyID);

if (spotifyID === null) {
    analysis = 'No URI entered'
} else {

    let url = 'http://localhost:8888/api/' + spotifyID
    console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(data => {
            analysis = data;
            console.log(data);
        });

}

// document.write(analysis);

// const postToServer = () => {
//     console.log("sf")
// }

/////////////////////////////
    
let access_token = ''

fetch('http://localhost:8888/api/token')
    .then(response => response.json())
    .then(data => {
        access_token = data;
        console.log(access_token)
    })


// spotify init 


// check if spotify player initialization has started
let spotifyPlayerStarted = false;
    
// check if spotify player started playing
let spotifyPlayerStartedPlaying = false;

//initialize device ID variable
let device_id_global = '';

// initialize spotify uri variable with example uri; gets overwritten with uri_from_submit
// let spotify_uri = 'spotify:track:0uRtI9z2jvfE9fdf67n8jq'
let spotify_uri = '0uRtI9z2jvfE9fdf67n8jq'


const startSpotifyPlayer = () => {
        // spotify_uri = uri_from_submit;
        fetch('https://api.spotify.com/v1/me/player/play?device_id=' + device_id_global, {
            method: 'PUT',
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
    
    spotifyPlayerStarted = true;
}

window.onSpotifyWebPlaybackSDKReady = () => {

    const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); }
    });

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    player.addListener('player_state_changed', state => {
        if (state.position >= 0) {
            spotifyPlayerStartedPlaying = true;
            // spotifyPlayerCurrentPosition 
        };

    });

    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        device_id_global = device_id;

    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    player.connect();

    player.togglePlay().then(() => {
        console.log('Toggled playback!');
    });

}