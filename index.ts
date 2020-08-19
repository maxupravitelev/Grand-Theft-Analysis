require("dotenv").config();

const express = require("express");
const app = express();
const request = require("request"); // todo: update to https://github.com/mikeal/bent
const cors = require("cors");
const qs = require("querystring");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(express.json());

let stateKey: string = "spotify_auth_state";

// spotify init // based on: https://github.com/spotify/web-api-auth-examples/tree/master/authorization_code

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_CLIENT_USERNAME = process.env.SPOTIFY_CLIENT_USERNAME;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

app.use(express.static("public"));
app.use(cookieParser());

app.get("/login", (req, res) => {
  let state: string = generateRandomString(16);
  res.cookie(stateKey, state);

  let scope: string = "streaming user-read-email user-read-private";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      qs.stringify({
        response_type: "code",
        client_id: SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: "http://localhost:8888/callback",
        state: state,
      })
  );
});

let token: string = "";

app.get("/callback", (req, res) => {
  let code = req.query.code || null;
//   console.log(typeof code) // object
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;

  console.log(code);

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        qs.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);

    let authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: "http://localhost:8888/callback",
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer.from(
            SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        let access_token: string = body.access_token;
        let refresh_token: string = body.refresh_token;

        // let options = {
        //   url: "https://api.spotify.com/v1/me",
        //   headers: { Authorization: "Bearer " + access_token },
        //   json: true,
        // };

        // // use the access token to access the Spotify Web API
        // request.get(options, (error, response, body) => {
        //   console.log(body);
        // });

        token = access_token;

        // pass token to browser
        // todo: disable token visibility in url in production
        res.redirect(
          "/?" +
            qs.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            })
        );
      } else {
        res.redirect(
          "/?" +
            qs.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
});

app.get("/api/token", (req, res) => {
  console.log(token);
  res.json(token);
});

app.get("/api/:id", (req, res) => {
  // console.log(req.params.id)

  let options: object = {
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

//////

// generating random state string @ app.get /login

let generateRandomString = (length) => {
  let text: string = "";
  let possible: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};