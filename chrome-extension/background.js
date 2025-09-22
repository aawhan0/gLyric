// Handles context menu and tab actions

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "openLyrics",
    title: "Open Lyrics on Genius",
    contexts: ["page", "selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "openLyrics") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: getSongTitleFromPage
    }, (results) => {
      if (results && results[0].result) {
        const query = encodeURIComponent(results[0].result);
        const url = `https://genius.com/search?q=${query}`;
        chrome.tabs.create({ url });
      } else {
        alert("Song info not found!");
      }
    });
  }
});

// This function runs in the page context to extract the YouTube video title
function getSongTitleFromPage() {
  const title = document.querySelector('h1.title yt-formatted-string')?.innerText || 
                document.title || "";
  return title;
}
