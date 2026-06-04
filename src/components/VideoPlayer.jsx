import { useState } from 'react';

function fmtNum(n) {
  n = parseInt(n || 0);
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return n;
}

function fmtDate(s) {
  return new Date(s).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function VideoPlayer({ video, stats }) {
  const [showDesc, setShowDesc] = useState(false);

  if (!video) {
    return (
      <div className="player-placeholder">
        <span className="placeholder-icon">▶</span>
        <p>Search or select a video to play</p>
      </div>
    );
  }

  const s = video.snippet;
  const st = stats?.statistics || {};

  return (
    <div className="video-player">
      <div className="iframe-wrap">
        <iframe
          key={video.id?.videoId || video.id}
          src={`https://www.youtube.com/embed/${video.id?.videoId || video.id}?autoplay=1`}
          allow="autoplay; fullscreen; encrypted-media"
          allowFullScreen
          title={s.title}
        />
      </div>

      <div className="video-meta">
        <h1 className="video-title">{s.title}</h1>
        <div className="video-stats">
          <span className="channel-name">📺 {s.channelTitle}</span>
          {st.viewCount && <span>👁 {fmtNum(st.viewCount)} views</span>}
          {st.likeCount && <span>👍 {fmtNum(st.likeCount)}</span>}
          <span>📅 {fmtDate(s.publishedAt)}</span>
        </div>

        {s.description && (
          <div className="desc-wrap">
            <button className="desc-toggle" onClick={() => setShowDesc(!showDesc)}>
              {showDesc ? 'Show less ▲' : 'Show more ▼'}
            </button>
            {showDesc && <p className="desc-text">{s.description}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
