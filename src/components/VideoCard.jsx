export default function VideoCard({ item, active, onClick }) {
  const s = item.snippet;
  const thumb = s.thumbnails?.medium?.url || s.thumbnails?.default?.url;

  return (
    <div className={`video-card ${active ? 'active' : ''}`} onClick={onClick}>
      <div className="card-thumb">
        <img src={thumb} alt={s.title} loading="lazy" />
        <span className="play-overlay">▶</span>
      </div>
      <div className="card-info">
        <p className="card-title">{s.title}</p>
        <p className="card-channel">{s.channelTitle}</p>
      </div>
    </div>
  );
}
