import os
import json
from flask import Flask, flash, jsonify, redirect, render_template, request, session
#from spotify import analyze
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from flask_session import Session
import spotipy.util as util


app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(64)
app.config['SESSION_TYPE'] = 'filesystem'

Session(app)

scope = 'streaming user-read-email user-read-private'

auth_manager = spotipy.oauth2.SpotifyOAuth(scope=scope)
spotify = spotipy.Spotify(auth_manager=auth_manager)

# Source for Auth Process: https://github.com/plamere/spotipy/issues/287
# Source: https://github.com/plamere/spotipy/blob/master/examples/app.py
@app.route("/")
def index():
    if request.args.get("code"):
        session['token_info'] = auth_manager.get_access_token(request.args["code"])
        session['tkn'] = session['token_info']['access_token']

        with open('token.txt', 'w') as outfile:
    	    outfile.write(session['tkn'])
        return render_template("submit.html")
        # return redirect('/submit')

    if not session.get('token_info'):
        auth_url = auth_manager.get_authorize_url()
        return f'<h2><a href="{auth_url}">Sign in</a></h2>'

    return f'<h2>Hi {spotify.me()["display_name"]}, ' \
           f'<small><a href="/sign_out">[sign out]<a/></small></h2>' \
           f'<a href="/submit">submit</a>'

@app.route('/sign_out')
def sign_out():
    session.clear()
    return redirect('/')

@app.route("/submit", methods=["GET", "POST"])
def analyze():

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        track = request.form.get("track")
        analysis = spotify.audio_analysis(track)
        
        spotify_id = track.replace('spotify:track:', '')
        tracks_info = spotify.track(spotify_id)
        artist_name = tracks_info["album"]["artists"][0]["name"]
        album_name = tracks_info["album"]["name"]
        song_name = tracks_info["name"]

        with open ("token.txt", "r") as myfile:
            token=myfile.read()
        
        return render_template("result.html", analysis=analysis, track=track, token=token, artist_name=artist_name, song_name=song_name, album_name=album_name)


    else:
        return render_template("submit.html")

    


