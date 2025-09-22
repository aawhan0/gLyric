// Handles context menu and tab actions

function openLyricsOnGenius() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab) return;

    chrome.tabs.sendMessage(tab.id, { action: "getSongInfo" }, (response) => {
      if (response && response.song) {
        const query = encodeURIComponent(`${response.artist} ${response.song}`);
        const url = `https://genius.com/search?q=${query}`;
        chrome.tabs.create({ url });
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
