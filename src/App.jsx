import { useCallback, useEffect, useRef, useState } from 'react';
import Search from './components/Search';
import Profile from './components/Profile';
import Repos from './components/Repos';
import LanguageChart from './components/LanguageChart';
import ScoreCard from './components/ScoreCard';
import { ScoreSkeleton, ProfileSkeleton, RepoSkeleton } from './components/Skeletons';
import './App.css';

const API = 'https://api.github.com';

async function getJson(url, signal) {
  const res = await fetch(url, {
    signal,
    headers: { Accept: 'application/vnd.github+json' },
  });

  if (res.status === 404) throw new Error('User not found — check the username and try again.');
  if (res.status === 403 || res.status === 429) {
    throw new Error('GitHub API rate limit reached. Please try again in a few minutes.');
  }
  if (!res.ok) throw new Error(`Request failed (${res.status}).`);

  return res.json();
}

const HeroPoints = () => (
  <ul className="hero-points">
    <li>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="m12 2 2.9 6.2 6.6.9-4.8 4.6 1.2 6.6L12 17.2l-5.9 3.1 1.2-6.6L2.5 9.1l6.6-.9L12 2Z" />
      </svg>
      Weighted developer score
    </li>
    <li>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19V5m0 14h16M8 15l3-4 3 3 5-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Language breakdown
    </li>
    <li>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
      Repo insights
    </li>
  </ul>
);

function App() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const abortRef = useRef(null);

  const fetchUser = useCallback(async (username, { updateUrl = true } = {}) => {
    const name = username.trim().replace(/^@/, '');
    if (!name) {
      setError('Please enter a GitHub username');
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError('');
    setUser(null);
    setRepos([]);

    try {
      const [userData, reposData] = await Promise.all([
        getJson(`${API}/users/${encodeURIComponent(name)}`, controller.signal),
        getJson(
          `${API}/users/${encodeURIComponent(name)}/repos?sort=updated&per_page=100&type=owner`,
          controller.signal,
        ),
      ]);

      setUser(userData);
      setRepos(reposData.filter((r) => !r.fork));

      if (updateUrl) {
        const url = new URL(window.location.href);
        url.searchParams.set('user', userData.login);
        window.history.replaceState({}, '', url);
      }
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError(err.message || 'Something went wrong.');
      if (updateUrl) {
        const url = new URL(window.location.href);
        url.searchParams.delete('user');
        window.history.replaceState({}, '', url);
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get('user');
    if (!initial) return;
    const timer = setTimeout(() => fetchUser(initial, { updateUrl: false }), 0);
    return () => clearTimeout(timer);
  }, [fetchUser]);

  return (
    <div className="app">
      <div className="bg-orbs">
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>
      </div>

      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">GA</span>
          Profile Analyzer
        </div>
        <a className="topbar-link" href="https://github.com" target="_blank" rel="noreferrer noopener">
          GitHub
        </a>
      </header>

      <main>
        <section className={user ? 'hero hero-compact' : 'hero'}>
          <span className="hero-badge">Free · No sign-in required</span>
          <h1>
            GitHub Profile <span className="grad-text">Analyzer</span>
          </h1>
          <p className="hero-sub">
            Enter any username to get a developer score, language breakdown and a ranked view of
            their best work — in seconds.
          </p>
          <Search onSearch={fetchUser} loading={loading} />
          {!user && !loading && <HeroPoints />}
        </section>

        {loading && (
          <>
            <ScoreSkeleton />
            <ProfileSkeleton />
            <div className="repo-grid" style={{ marginBottom: 22 }}>
              <RepoSkeleton />
              <RepoSkeleton />
              <RepoSkeleton />
            </div>
          </>
        )}

        {error && (
          <div className="error" role="alert">
            <span aria-hidden="true">⚠</span>
            {error}
          </div>
        )}

        {user && (
          <>
            <ScoreCard user={user} repos={repos} />
            <Profile user={user} />
            <LanguageChart repos={repos} />
            <Repos repos={repos} />
          </>
        )}
      </main>

      <footer className="footer">
        Data from the GitHub REST API · Built with React + Vite
      </footer>
    </div>
  );
}

export default App;
