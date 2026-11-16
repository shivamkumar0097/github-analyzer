import { useState } from 'react';
import { getLangColor } from '../utils/languages';

const SIZE = 132;
const STROKE = 17;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function LanguageChart({ repos }) {
  const [active, setActive] = useState(null);

  const langCount = {};
  repos.forEach((repo) => {
    if (repo.language) {
      langCount[repo.language] = (langCount[repo.language] || 0) + 1;
    }
  });

  const data = Object.entries(langCount)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const total = data.reduce((sum, d) => sum + d.value, 0);

  if (data.length === 0) return null;

  const { segments } = data.reduce(
    (acc, entry, i) => {
      const fraction = entry.value / total;
      const gap = data.length > 1 ? 1.6 : 0;
      const length = Math.max(fraction * CIRCUMFERENCE - gap, 0.5);
      const segment = {
        ...entry,
        color: getLangColor(entry.name, i),
        length,
        offset: acc.offset,
        pct: Math.round(fraction * 100),
      };
      return {
        offset: acc.offset + fraction * CIRCUMFERENCE,
        segments: [...acc.segments, segment],
      };
    },
    { offset: 0, segments: [] },
  );

  return (
    <div className="chart card glass" style={{ '--d': '0.18s' }}>
      <div className="section-head">
        <h3>Top Languages</h3>
        <small>{total} repos analysed</small>
      </div>

      <div className="chart-layout">
        <div className="donut-wrap">
          <svg
            className="donut"
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            role="img"
            aria-label="Language distribution"
          >
            <circle
              className="donut-track"
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              strokeWidth={STROKE}
            />
            {segments.map((seg, i) => (
              <circle
                key={seg.name}
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke={seg.color}
                strokeWidth={active === i ? STROKE + 3 : STROKE}
                strokeLinecap="round"
                strokeDasharray={`${seg.length} ${CIRCUMFERENCE - seg.length}`}
                strokeDashoffset={-seg.offset}
                transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
                opacity={active === null || active === i ? 1 : 0.28}
                className="donut-seg"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              />
            ))}
          </svg>
          <div className="donut-center">
            <strong>{active === null ? total : segments[active].pct + '%'}</strong>
            <small>{active === null ? 'repos' : segments[active].name}</small>
          </div>
        </div>

        <div className="lang-legend">
          {segments.map((seg, i) => (
            <div
              className="lang-row"
              key={seg.name}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <i className="lang-dot" style={{ background: seg.color }} />
              <span className="lang-name">{seg.name}</span>
              <span className="lang-bar">
                <i style={{ width: `${seg.pct}%`, background: seg.color }} />
              </span>
              <span className="lang-pct">{seg.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
