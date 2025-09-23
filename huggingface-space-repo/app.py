from fastapi import FastAPI, HTTPException, Query
import requests
import os

app = FastAPI()

GENIUS_API_TOKEN = os.getenv("GENIUS_API_TOKEN")
if not GENIUS_API_TOKEN:
    raise RuntimeError("GENIUS_API_TOKEN environment variable not set")

def search_genius_lyrics(query: str):
    url = "https://api.genius.com/search"
    headers = {"Authorization": f"Bearer {GENIUS_API_TOKEN}"}
    params = {"q": query}
    response = requests.get(url, headers=headers, params=params)
    if response.status_code != 200:
        raise HTTPException(status_code=502, detail="Genius API error")
    data = response.json()
    hits = data.get("response", {}).get("hits", [])
    if not hits:
        return None
    song_info = hits[0]["result"]
    return {
        "title": song_info["title"],
        "artist": song_info["primary_artist"]["name"],
        "url": song_info["url"]
    }

@app.get("/lyrics/")
def get_lyrics(artist: str = Query(...), song: str = Query(...)):
    query = f"{artist} {song}"
    lyrics_info = search_genius_lyrics(query)
    if not lyrics_info:
        raise HTTPException(status_code=404, detail="Lyrics not found")
    return lyrics_info
