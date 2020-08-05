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