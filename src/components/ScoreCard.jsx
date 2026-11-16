import useCountUp from '../hooks/useCountUp';

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ScoreCard({ user, repos }) {
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);

  const score = Math.min(
    100,
    Math.round(
      user.public_repos * 2 +
        user.followers * 0.5 +
        totalStars * 0.3 +
        user.public_gists +
        totalForks * 0.1,
    ),
  );

  const animated = useCountUp(score);

  let rank = 'Beginner';
  if (score >= 80) rank = 'Pro';
  else if (score >= 50) rank = 'Intermediate';
  else if (score >= 25) rank = 'Active';

  const stats = [
    { label: 'Repos', value: user.public_repos },
    { label: 'Stars', value: totalStars },
    { label: 'Forks', value: totalForks },
    { label: 'Followers', value: user.followers },
  ];

  return (
    <div className="score-card card glass" style={{ '--d': '0.05s' }}>
      <div className="score-ring">
        <svg viewBox="0 0 120 120" role="img" aria-label={`Developer score ${score} out of 100`}>
          <defs>
            <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="55%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
          <circle className="ring-track" cx="60" cy="60" r={RADIUS} />
          <circle
            className="ring-fill"
            cx="60"
            cy="60"
            r={RADIUS}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE}
          />
        </svg>
        <div className="ring-center">
          <strong>{animated}</strong>
          <small>/ 100</small>
        </div>
      </div>

      <div className="score-info">
        <h3>Developer Score</h3>
        <p className="rank">{rank}</p>
        <p className="score-desc">Weighted from repos, stars, forks &amp; followers.</p>
        <div className="score-breakdown">
          {stats.map((s) => (
            <span className="chip" key={s.label}>
              <strong>{s.value.toLocaleString('en-US')}</strong> {s.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
