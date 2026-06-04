function fmtNum(n) {
  n = parseInt(n || 0);
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return n;
}

function initials(name) {
  return (name || '?').split(' ').slice(0, 2).map(w => w[0] || '').join('').toUpperCase() || '?';
}

const COLORS = ['#4F46E5', '#0891B2', '#059669', '#D97706', '#DC2626', '#7C3AED', '#DB2777'];

function avatarColor(name) {
  let h = 0;
  for (let c of (name || '')) h = (h * 31 + c.charCodeAt(0)) % COLORS.length;
  return COLORS[h];
}

export default function Comments({ comments, loading, error }) {
  if (loading) return <div className="comments-status">Loading comments…</div>;
  if (error) return <div className="comments-status error">{error}</div>;
  if (!comments) return null;
  if (comments.length === 0) return <div className="comments-status">No comments available.</div>;

  return (
    <div className="comments-section">
      <h2 className="comments-heading">💬 Comments ({comments.length})</h2>
      <div className="comments-list">
        {comments.map(item => {
          const c = item.snippet.topLevelComment.snippet;
          return (
            <div key={item.id} className="comment-item">
              <div
                className="comment-avatar"
                style={{ background: avatarColor(c.authorDisplayName) }}
              >
                {initials(c.authorDisplayName)}
              </div>
              <div className="comment-body">
                <div className="comment-author">{c.authorDisplayName}</div>
                <div
                  className="comment-text"
                  dangerouslySetInnerHTML={{ __html: c.textDisplay }}
                />
                <div className="comment-likes">👍 {fmtNum(c.likeCount)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
