# GitHub Profile Analyzer

A fast, no-sign-in web app that turns any GitHub username into a clean developer profile. Enter a handle and instantly get a weighted developer score, language breakdown, and a ranked view of their best repositories.

Built with React 19 + Vite, powered by the public GitHub REST API.

## Features

- **Developer score** - a 0-100 score weighted from repos, stars, forks, followers, and gists, with a rank (Beginner / Active / Intermediate / Pro).
- **Profile overview** - avatar, bio, location, followers, and other public stats in one view.
- **Language breakdown** - visual chart of the languages used across the account's repositories.
- **Repo insights** - top repositories ranked so the best work stands out.
- **Shareable results** - the username is stored in the URL (`?user=name`), so you can bookmark or share a profile.
- **Polished UX** - loading skeletons, friendly error states for missing users and rate limits, and a responsive dark UI.
- **No sign-in** - everything runs in the browser with the public API.

## Tech Stack

- React 19
- Vite
- ESLint
- GitHub REST API

## Getting Started

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal, then enter any GitHub username.

### Build for production

```bash
npm run build
npm run preview
```

## How the Score Works

The score is calculated from public profile data:

```
score = repos * 2 + followers * 0.5 + stars * 0.3 + gists + forks * 0.1
```

It is capped at 100.

## Project Structure

```
src/
  components/   Search, Profile, Repos, LanguageChart, ScoreCard, Skeletons
  hooks/        useCountUp
  utils/        language helpers
  App.jsx       main app logic and data fetching
```

## Notes

- Data comes from the public GitHub REST API, so unauthenticated requests are subject to GitHub's rate limits.
- Forked repos are excluded from the analysis.

## License

MIT
