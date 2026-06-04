# YTPlay — YouTube Search & Player

A React app to search, play, and browse YouTube videos with comments.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Add your YouTube API key**  
   Open `src/App.jsx` and replace `YOUR_API_KEY_HERE` on line 8:
   ```js
   const API_KEY = 'AIzaXXXXXXXXXXXXXXXXXXXXXXXXXXX';
   ```

3. **Run the app**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173

## Getting a YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create or select a project
3. Enable **YouTube Data API v3**
4. Go to **Credentials → Create Credentials → API Key**
5. Copy the key into `src/App.jsx`

## Features

- 🔍 Search YouTube videos
- ▶️ Play videos with autoplay
- 📊 View counts, likes, channel info
- 🔗 Related video suggestions (auto-loads on video select)
- 💬 Comments with like counts
- 📱 Responsive layout

## Project Structure

```
src/
  api/
    youtube.js        # YouTube Data API v3 helper
  components/
    SearchBar.jsx     # Search form
    VideoPlayer.jsx   # Embedded player + metadata
    VideoCard.jsx     # Suggestion card
    Comments.jsx      # Comments list
  App.jsx             # Main app with state management
  App.css             # Dark YouTube-style theme
```
