require("dotenv").config();

const express = require("express");
const app = express();
const request = require("request");
const cors = require("cors");
const qs = require("querystring");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(express.json());

var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = "spotify_auth_state";

// spotify init // based on: https://github.com/spotify/web-api-auth-examples/tree/master/authorization_code

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_CLIENT_USERNAME = process.env.SPOTIFY_CLIENT_USERNAME;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

app.use(express.static("public"));
app.use(cookieParser());

app.get("/login", function (req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  var scope = "streaming user-read-email user-read-private";

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

var token = "";

app.get("/callback", function (req, res) {
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

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
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: "http://localhost:8888/callback",
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString(
            "base64"
          ),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {
          console.log(body);
        });

        token = access_token;

        // we can also pass the token to the browser to make requests from there
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

const sentIDforAnalysis = (id) => {
  let options = {
    url: "https://api.spotify.com/v1/audio-analysis/" + id,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    json: true,
  };
  console.log(options);
  request.get(options, (error, response, body) => {
    // console.log(body.meta)
  });
};

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
