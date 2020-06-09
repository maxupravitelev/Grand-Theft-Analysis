Drive around in your browser while listening to tracks from Spotify with basic music visualisation.

Running on a local machine:

Set enviroment variables for:

SPOTIPY_CLIENT_ID=' '

SPOTIPY_CLIENT_SECRET=' '

SPOTIPY_CLIENT_USERNAME=' '

SPOTIPY_REDIRECT_URI='http://127.0.0.1:5000/'

SPOTIPY_SCOPE='streaming user-read-email user-read-private'

FLASK_APP='application'

You can get the first two env variables in your spotify dashboard after creating a new app at:
https://developer.spotify.com/dashboard/applications

Important: Set the redirect URI in the settings.
