import { useEffect, useState } from 'react';

const Icon = ({ d, size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {d}
  </svg>
);

const icons = {
  location: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  company: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
    </>
  ),
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
      <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 11h18" />
    </>
  ),
  star: (
    <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" />
  ),
};

export default function Profile({ user }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!showModal) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [showModal]);

  const blog = user.blog?.startsWith('http') ? user.blog : user.blog ? `https://${user.blog}` : null;
  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
    : null;

  const stats = [
    { label: 'Repos', value: user.public_repos },
    { label: 'Followers', value: user.followers },
    { label: 'Following', value: user.following },
    { label: 'Gists', value: user.public_gists },
  ];

  return (
    <>
      <div className="profile card glass" style={{ '--d': '0.1s' }}>
        <div className="avatar-wrap">
          <img
            className="avatar"
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            onClick={() => setShowModal(true)}
          />
          {user.hireable && <span className="avatar-badge">Open to work</span>}
        </div>

        <div className="profile-body">
          <h2>{user.name || user.login}</h2>
          <p className="username">@{user.login}</p>
          <p className="bio">{user.bio || 'This developer has not written a bio yet.'}</p>

          <div className="meta-row">
            {user.location && (
              <span>
                <Icon d={icons.location} /> {user.location}
              </span>
            )}
            {user.company && (
              <span>
                <Icon d={icons.company} /> {user.company}
              </span>
            )}
            {blog && (
              <span>
                <Icon d={icons.link} />
                <a href={blog} target="_blank" rel="noreferrer noopener">
                  {user.blog.replace(/^https?:\/\//, '')}
                </a>
              </span>
            )}
            {memberSince && (
              <span>
                <Icon d={icons.calendar} /> Joined {memberSince}
              </span>
            )}
          </div>

          <div className="stats">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <strong>{s.value.toLocaleString('en-US')}</strong>
                <small>{s.label}</small>
              </div>
            ))}
          </div>

          <div className="actions">
            <a href={user.html_url} target="_blank" rel="noreferrer noopener" className="github-btn">
              <Icon d={icons.star} size={15} /> View Profile
            </a>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="photo-modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={user.avatar_url} alt={`${user.login}'s avatar`} />
            <button
              className="close-btn"
              onClick={() => setShowModal(false)}
              aria-label="Close image"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
