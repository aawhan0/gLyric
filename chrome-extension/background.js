// Handles context menu and tab actions

function openLyricsOnGenius() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab) return;

    chrome.tabs.sendMessage(tab.id, { action: "getSongInfo" }, (response) => {
      if (response && response.song) {
        const queryParams = new URLSearchParams({
          artist: response.artist,
          song: response.song,
        }).toString();

        const backendUrl = `http://127.0.0.1:8000/lyrics/?${queryParams}`;

        fetch(backendUrl)
          .then((res) => {
            if (!res.ok) throw new Error("Lyrics not found");
            return res.json();
          })
          .then((data) => {
            chrome.tabs.create({ url: data.url });
          })
          .catch((error) => {
            // Fallback to Genius search if backend fails
            const fallbackQuery = encodeURIComponent(`${response.artist} ${response.song}`);
            const geniusUrl = `https://genius.com/search?q=${fallbackQuery}`;
            chrome.tabs.create({ url: geniusUrl });
          });
      } else {
        alert("Could not extract song information.");
      }
    });
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "openLyrics",
    title: "Open Lyrics on Genius",
    contexts: ["page", "selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "openLyrics") {
    openLyricsOnGenius();
  }
});
