require('dotenv').config()

const querystring = require('querystring')
const express = require('express')
const app = express()

// spotify init
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const SPOTIFY_CLIENT_USERNAME = process.env.SPOTIFY_CLIENT_USERNAME
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI

// https://www.npmjs.com/package/spotify-web-api-node
const SpotifyWebAPI = require('spotify-web-api-node')

const spotifyAPI = new SpotifyWebAPI({
    clientID: SPOTIFY_CLIENT_ID,
    clientSecret: SPOTIFY_CLIENT_SECRET,
    // redirectUri: SPOTIFY_REDIRECT_URI
})



// spotifyApi.setAccessToken('<your_access_token>');

const scopes = ["streaming", "user-read-birthdate", "user-read-email", "user-read-private"];

const redirectUriParameters = {
    client_id: process.env.CLIENT_ID,
    response_type: 'token',
    scope: scopes.join(' '),
    redirect_uri: encodeURI(SPOTIFY_REDIRECT_URI),
    show_dialog: true,
  }

const redirectURI = `https://accounts.spotify.com/authorize?${querystring.stringify(redirectUriParameters)}`;

console.log(redirectURI)

// Retrieve an access token.
const authenticate = () => {
    spotifyAPI.clientCredentialsGrant()
        .then(data => {
            console.log('The access token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);
        
            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body['access_token']);
        }
        , (err) => {
            console.log('Something went wrong when retrieving an access token', err);
        })
}

authenticate();


app.get("/spotifyRedirectIrl", (req, res) => {
    resonse.send(JSON.stringify({
        redirectURI
    }, null, 2))
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


//backup .env
// SPOTIFY_REDIRECT_URI=https://grandtheftanalysis.herokuapp.com/
