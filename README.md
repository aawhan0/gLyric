# gLyric

gLyric is a Chrome extension that helps users quickly find song lyrics by detecting the currently playing song title and artist on websites like YouTube, and providing a convenient option to open the lyrics on Genius.com.

---

## Features

- Automatically extracts song title and artist from YouTube video titles
- Displays an "Open Lyrics" button or context menu option
- Opens Genius.com search page for the detected song in a new browser tab
- Lightweight and easy to use

---

## Installation

1. Clone or download this repository.

```
git clone https://github.com/aawhan0/gLyric.git
```
text

2. Open Chrome and go to `chrome://extensions/`.

3. Enable "Developer mode" (toggle in the top-right corner).

4. Click "Load unpacked" and select the cloned/downloaded project directory.

5. The extension will be loaded and active on supported sites like YouTube.

---

## Usage

- Navigate to a YouTube video playing a song.
- The extension will detect the song title and artist from the video title.
- Click the "Open Lyrics" button or right-click and select "Open Lyrics" from the context menu.
- A new tab will open with Genius.com showing search results for the detected song.

---

## Supported Platforms

- YouTube (initial release)
- Additional platforms will be supported in future updates.

---

## Development

- This project uses Chrome Extension Manifest V3.
- Content scripts parse webpage titles for song information.
- Background scripts manage context menu and tab opening.
- Contributions and suggestions are welcome!

---

## Attribution

This project, **gLyric**, is an independent tool to help users find song lyrics by linking to external lyrics providers. Where applicable, the extension may utilize the Genius API or direct users to Genius.com for accessing song lyrics.

**gLyric** is not affiliated with, endorsed by, or sponsored by Genius Media Group Inc. or any other lyrics service provider. All trademarks, service marks, and trade names referenced belong to their respective owners.

Users are encouraged to respect copyright and licensing agreements when accessing or sharing song lyrics.

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## Contact

For questions or feedback, please open an issue or contact the maintainer directly.

---
