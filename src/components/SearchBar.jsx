import { useState } from 'react';

export default function SearchBar({ onSearch, loading }) {
  const [q, setQ] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (q.trim()) onSearch(q.trim());
  };

  return (
    <form onSubmit={submit} className="search-bar">
      <input
        type="text"
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Search YouTube…"
        className="search-input"
      />
      <button type="submit" className="search-btn" disabled={loading}>
        {loading ? '⏳' : '🔍'} Search
      </button>
    </form>
  );
}
