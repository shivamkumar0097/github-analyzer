import { useEffect, useRef, useState } from 'react';

export default function Search({ onSearch, loading }) {
  const [username, setUsername] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    onSearch(username);
  };

  return (
    <form onSubmit={handleSubmit} className="search">
      <span className="search-icon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.2-3.2" strokeLinecap="round" />
        </svg>
      </span>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter a GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        aria-label="GitHub username"
        autoComplete="off"
        spellCheck="false"
        autofill="on"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Analyzing' : 'Analyze'}
        {!loading && <kbd>↵</kbd>}
      </button>
    </form>
  );
}
