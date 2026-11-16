import { useState } from 'react';
import { getLangColor } from '../utils/languages';

const timeAgo = (date) => {
  const days = Math.floor((Date.now() - new Date(date)) / 86400000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
};

export default function Repos({ repos }) {
  const [sort, setSort] = useState('stars');

  if (repos.length === 0) return null;

  const sorted = [...repos].sort((a, b) => {
    if (sort === 'stars') return b.stargazers_count - a.stargazers_count;
    if (sort === 'forks') return b.forks_count - a.forks_count;
    if (sort === 'name') return a.name.localeCompare(b.name);
    return new Date(b.updated_at) - new Date(a.updated_at);
  });

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div className="repos card glass" style={{ '--d': '0.25s' }}>
      <div className="section-head">
        <h3>Repositories</h3>
        <div className="sort-tabs">
          {['stars', 'updated', 'forks', 'name'].map((key) => (
            <button
              key={key}
              className={sort === key ? 'sort-tab active' : 'sort-tab'}
              onClick={() => setSort(key)}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      <div className="repo-grid">
        {sorted.slice(0, 9).map((repo, i) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noreferrer noopener"
            className="repo-card"
            onMouseMove={onMove}
          >
            <h4>{repo.name}</h4>
            <p>{repo.description || 'No description provided.'}</p>

            {repo.topics?.length > 0 && (
              <div className="repo-topics">
                {repo.topics.slice(0, 3).map((topic) => (
                  <span className="topic" key={topic}>
                    {topic}
                  </span>
                ))}
              </div>
            )}

            <div className="repo-meta">
              <span className="stars">★ {repo.stargazers_count.toLocaleString('en-US')}</span>
              {repo.language && (
                <span>
                  <i
                    className="lang-dot-inline"
                    style={{ background: getLangColor(repo.language, i) }}
                  />
                  {repo.language}
                </span>
              )}
              <span>⑂ {repo.forks_count.toLocaleString('en-US')}</span>
              <span>· {timeAgo(repo.updated_at)}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
