from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware
from fastapi.middleware.cors import CORSMiddleware
from config import Config
from state import ApplicationState
from db import Database, Cache
from contextlib import asynccontextmanager
from lib.functions import get_albums_info
#need to send the url,images,album_cover,genre,title whenever the user clicks
#the discover button what should be outputed is the related artists info with the requirements above

#for the generate the ai inishts we need to send the song or artist that the user inputed to generate and then we call the open api  to receive the content
#and also we need to send the response back to the user

@asynccontextmanager
async def lifespan(app: FastAPI):
    # api.set_db(Database())
    # api.set_cache(Cache())
    # await api.initialize()
    yield
    await api.db.disconnect()

api = ApplicationState()

app = FastAPI(lifespan=lifespan)

app.add_middleware(SessionMiddleware, secret_key=Config.SECRET_KEY, max_age=3600)

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

@app.get("/")
def root():
    return {"data": "Hello World"}
import json
@app.get("/album")
def get_albums(artist: str):
    return get_albums_info(artist)
# song model
# artist: string
# song: string
# release_year: int
# genre: string
# album: string


# meaning: 
# inspiration:
# impact