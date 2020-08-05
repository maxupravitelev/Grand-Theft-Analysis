require('dotenv').config()

const querystring = require('querystring')
const express = require('express')
const app = express()

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const SPOTIFY_CLIENT_USERNAME = process.env.SPOTIFY_CLIENT_USERNAME
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI 