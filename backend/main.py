from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware
from fastapi.middleware.cors import CORSMiddleware
from config import Config
from state import ApplicationState
from db import Database, Cache
from contextlib import asynccontextmanager
#need to send the url,images,album_cover,genre,title whenever the user clicks
#the discover button what should be outputed is the related artists info with the requirements above

#for the generate the ai inishts we need to send the song or artist that the user inputed to generate and then we call the open api  to receive the content
#and also we need to send the response back to the user

@asynccontextmanager
async def lifespan(app: FastAPI):
    api.set_db(Database())
    api.set_cache(Cache())
    await api.initialize()
    yield
    await api.db.disconnect()

api = ApplicationState()

app = FastAPI(lifespan=lifespan)

app.add_middleware(SessionMiddleware, secret_key=Config.SECRET_KEY, max_age=3600)

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

@app.get("/")
def root():
    return {"data": "Hello World"}


import base64
from dotenv import load_dotenv
import os
import json
from requests import post, get

# Load environment variables
load_dotenv()
client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

def get_token():
    """Retrieves an access token from Spotify API."""
    if not client_id or not client_secret:
        raise ValueError("Missing CLIENT_ID or CLIENT_SECRET in environment variables.")

    auth_string = f"{client_id}:{client_secret}"
    auth_bytes = auth_string.encode("utf-8")
    auth_base64 = base64.b64encode(auth_bytes).decode("utf-8")

    url = "https://accounts.spotify.com/api/token"  # Fixed the URL
    headers = {
        "Authorization": f"Basic {auth_base64}",  # Fixed missing space
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {"grant_type": "client_credentials"}

    try:
        result = post(url, headers=headers, data=data)
        result.raise_for_status()  # Raises error for non-200 responses
        json_result = result.json()
        return json_result.get("access_token")
    except Exception as e:
        print(f"Error fetching token: {e}")
        return None

def get_auth_header(token):
    """Returns authorization headers for API requests."""
    return {"Authorization": f"Bearer {token}"}

def search_for_artists(token, artist_name):
    """Searches for an artist by name on Spotify."""
    url = "https://api.spotify.com/v1/search?"
    headers = get_auth_header(token)
    query = f"q={artist_name}&type=artist&limit=1"
    
    try:
        result = get(url + query, headers=headers)
        result.raise_for_status()
        json_result = result.json().get("artists", {}).get("items", [])
        if not json_result:
            print("No artist with this name exists")
            return None
        return json_result[0]
    except Exception as e:
        print(f"Error searching for artist: {e}")
        return None

def get_songs_info(token, artist_id,endpoint,song_info,album_cover,song_cover):
    """Fetches songs or albums info for an artist."""
    url = f"https://api.spotify.com/v1/artists/{artist_id}/{endpoint}/{song_info}/{album_cover}/{song_cover}"
    headers = get_auth_header(token)

    try:
        response = get(url, headers=headers)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching artist's {endpoint}: {e}")
        return None

# Run the script
token = get_token()
if token:
    result = search_for_artists(token, "Summrs")  # Fixed artist name typo
    if result:
        artist_id = result["id"]
        print(f"Artist ID: {artist_id}")
       

        # Example: Fetch artist albums
        albums = get_songs_info(token, artist_id, "albums")
        if albums:
            print(json.dumps(albums, indent=2))
