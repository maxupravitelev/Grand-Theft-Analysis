"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
const request = require("request");
const cors = require("cors");
const qs = require("querystring");
const cookieParser = require("cookie-parser");
const mapRouter = require('./controllers/maps');
app.use(cors());
app.use(express.json());
app.use('/api/maps', mapRouter);
let stateKey = "spotify_auth_state";
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_CLIENT_USERNAME = process.env.SPOTIFY_CLIENT_USERNAME;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
app.use(express.static("public"));
app.use(cookieParser());
app.get("/login", (req, res) => {
    let state = generateRandomString(16);
    res.cookie(stateKey, state);
    let scope = "streaming user-read-email user-read-private";
    let authSpecs = {
        response_type: "code",
        client_id: SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: SPOTIFY_REDIRECT_URI + "callback",
        state: state,
    };
    console.log(authSpecs);
    res.redirect("https://accounts.spotify.com/authorize?" +
        qs.stringify(authSpecs));
});
let token = "";
app.get("/callback", (req, res) => {
    let code = req.query.code || null;
    let state = req.query.state || null;
    let storedState = req.cookies ? req.cookies[stateKey] : null;
    console.log("code: " + code);
    if (state === null || state !== storedState) {
        res.redirect("/#" +
            qs.stringify({
                error: "state_mismatch",
            }));
    }
    else {
        res.clearCookie(stateKey);
        let authOptions = {
            url: "https://accounts.spotify.com/api/token",
            form: {
                code: code,
                redirect_uri: SPOTIFY_REDIRECT_URI + "callback",
                grant_type: "authorization_code",
            },
            headers: {
                Authorization: "Basic " +
                    new Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString("base64"),
            },
            json: true,
        };
        console.log("authOptions");
        console.log(authOptions);
        request.post(authOptions, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                let access_token = body.access_token;
                let refresh_token = body.refresh_token;
                token = access_token;
                res.redirect("/?" +
                    qs.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token,
                    }));
            }
            else {
                res.redirect("/?" +
                    qs.stringify({
                        error: "invalid_token",
                    }));
            }
        });
    }
});
app.get("/api/token", (req, res) => {
    console.log("token: " + token);
    res.json(token);
});
app.get("/api/:id", (req, res) => {
    let options = {
        url: "https://api.spotify.com/v1/audio-analysis/" + req.params.id,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        json: true,
    };
    request.get(options, (error, response, body) => {
        console.log(body.meta);
        res.json(body);
    });
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
let generateRandomString = (length) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
