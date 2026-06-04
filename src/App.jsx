import { useState, useCallback } from 'react';
import { ytApi } from './api/youtube';
import SearchBar from './components/SearchBar';
import VideoPlayer from './components/VideoPlayer';
import VideoCard from './components/VideoCard';
import Comments from './components/Comments';
import './App.css';

const API_KEY = 'AIzaSyC0tTpoleOEk_zLXP62e4V3o8vg5hVjQSQ'; // ← paste your key here

export default function App() {
  const api = ytApi(API_KEY);

  const [results, setResults] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [videoStats, setVideoStats] = useState(null);
  const [comments, setComments] = useState(null);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [tab, setTab] = useState('suggestions');

  const handleSearch = useCallback(async (q) => {
    setSearchLoading(true);
    setActiveVideo(null);
    setVideoStats(null);
    setComments(null);
    try {
      const data = await api.search(q);
      const items = data.items || [];
      setResults(items);
      if (items.length > 0) selectVideo(items[0]);
    } catch (e) {
      alert('Search failed: ' + (e.response?.data?.error?.message || e.message));
    }
    setSearchLoading(false);
  }, []);

  const selectVideo = useCallback(async (item) => {
    setActiveVideo(item);
    setComments(null);
    setVideoStats(null);
    setTab('suggestions');
    const vid = item.id?.videoId || item.id;
    try {
      const stats = await api.videoStats(vid);
      setVideoStats(stats.items?.[0] || null);
    } catch (_) {}
    try {
      const rel = await api.related(vid);
      if (rel.items?.length) setResults(rel.items);
    } catch (_) {}
  }, []);

  const loadComments = useCallback(async () => {
    if (!activeVideo) return;
    const vid = activeVideo.id?.videoId || activeVideo.id;
    setTab('comments');
    setCommentsLoading(true);
    setCommentsError(null);
    try {
      const data = await api.comments(vid);
      setComments(data.items || []);
    } catch (e) {
      setCommentsError(e.response?.data?.error?.message || 'Failed to load comments');
    }
    setCommentsLoading(false);
  }, [activeVideo]);

  const activeId = activeVideo?.id?.videoId || activeVideo?.id;

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">▶</span>
          <span className="logo-text">YT<span>Play</span></span>
        </div>
        <SearchBar onSearch={handleSearch} loading={searchLoading} />
      </header>

      <main className="app-main">
        <section className="player-section">
          <VideoPlayer video={activeVideo} stats={videoStats} />

          {activeVideo && (
            <div className="tabs">
              <button
                className={`tab-btn ${tab === 'suggestions' ? 'active' : ''}`}
                onClick={() => setTab('suggestions')}
              >
                🎬 Related Videos
              </button>
              <button
                className={`tab-btn ${tab === 'comments' ? 'active' : ''}`}
                onClick={loadComments}
              >
                💬 Comments
              </button>
            </div>
          )}

          {tab === 'comments' && (
            <Comments
              comments={comments}
              loading={commentsLoading}
              error={commentsError}
            />
          )}
        </section>

        <aside className="sidebar">
          <h2 className="sidebar-title">
            {activeVideo ? '🔗 Related' : '🔍 Results'}
          </h2>
          {searchLoading && <p className="loading-msg">Searching…</p>}
          {results.length === 0 && !searchLoading && (
            <p className="empty-msg">Search for something to get started</p>
          )}
          <div className="sidebar-list">
            {results.map(item => (
              <VideoCard
                key={item.id?.videoId || item.etag}
                item={item}
                active={(item.id?.videoId || item.id) === activeId}
                onClick={() => selectVideo(item)}
              />
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}
