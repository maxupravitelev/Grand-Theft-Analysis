require("dotenv").config();

const express = require("express");
const app = express();
const request = require("request")
// const cors = require("cors");

// app.use(cors());
app.use(express.json());

app.use(express.static('public'));


// spotify init
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const SPOTIFY_CLIENT_USERNAME = process.env.SPOTIFY_CLIENT_USERNAME
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

var token = '';

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    token = body.access_token;
    console.log(token)
    var options = {
      url: 'https://api.spotify.com/v1/users/' + SPOTIFY_CLIENT_USERNAME,
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      console.log(body);
    });
  }
});

app.get("/api/token", (req, res) => {
  res.json(token)
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});