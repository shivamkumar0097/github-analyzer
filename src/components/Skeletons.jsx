export function ScoreSkeleton() {
  return (
    <div className="score-card card glass">
      <div className="skeleton skel-circle" />
      <div style={{ flex: 1 }}>
        <div className="skeleton skel-line" style={{ width: '38%', height: 20 }} />
        <div className="skeleton skel-line" style={{ width: '22%', height: 14 }} />
        <div className="skeleton skel-line" style={{ width: '65%' }} />
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="profile card glass">
      <div className="skeleton skel-circle" />
      <div style={{ flex: 1 }}>
        <div className="skeleton skel-line" style={{ width: '45%', height: 24 }} />
        <div className="skeleton skel-line" style={{ width: '28%' }} />
        <div className="skeleton skel-line" style={{ width: '85%' }} />
        <div className="skeleton skel-line" style={{ width: '60%' }} />
      </div>
    </div>
  );
}

export function RepoSkeleton() {
  return (
    <div className="repo-card" style={{ pointerEvents: 'none' }}>
      <div className="skeleton skel-line" style={{ width: '55%', height: 16 }} />
      <div className="skeleton skel-line" style={{ width: '90%' }} />
      <div className="skeleton skel-line" style={{ width: '70%' }} />
      <div className="skeleton skel-line" style={{ width: '40%', marginTop: 18 }} />
    </div>
  );
}
