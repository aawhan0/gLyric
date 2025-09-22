// Extracts song info from web pages

// Improved content script to parse song title and artist from YouTube video title

function parseTitle(title) {
  // Example YouTube video title formats:
  // "Artist Name - Song Title [Official Video]"
  // "Song Title by Artist Name (Lyrics)"
  // "Artist Name | Song Title"
  // Aim to extract "Artist Name" and "Song Title" reliably.

  let artist = "";
  let song = "";

  // Try format "Artist - Song"
  if (title.includes("-")) {
    const parts = title.split("-");
    artist = parts[0].trim();
    song = parts.slice(1).join("-").trim(); // In case multiple dashes
  } else if (title.includes("|")) {
    // Fallback format "Artist | Song"
    const parts = title.split("|");
    artist = parts[0].trim();
    song = parts[1].trim();
  } else {
    // Fallback: take whole title as song
    song = title.trim();
  }

  // Remove common extra words in song like [Official Video], (Lyrics)
  song = song.replace(/\[(.*?)\]|\((.*?)\)/g, "").trim();

  return { artist, song };
}

function getSongInfo() {
  const pageTitle = document.title || "";
  return parseTitle(pageTitle);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSongInfo") {
    const info = getSongInfo();
    sendResponse(info);
  }
});
