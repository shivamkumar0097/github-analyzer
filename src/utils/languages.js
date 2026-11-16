export const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Shell: '#89e051',
  Vue: '#41b883',
  'Jupyter Notebook': '#DA5B0B',
  Lua: '#000080',
  Scala: '#c22d40',
  Elixir: '#6e4a7e',
  Haskell: '#5e5086',
  Clojure: '#db5855',
  Nix: '#7e7eff',
  Dockerfile: '#384d54',
  HTML5: '#e34c26',
  Makefile: '#427819',
  CMake: '#DA3434',
  Julia: '#a270ba',
  'Objective-C': '#438eff',
  Assembly: '#6E4C13',
  Astro: '#ff5a03',
  Svelte: '#ff3e00',
};

const FALLBACK = [
  '#fb7185',
  '#38bdf8',
  '#c084fc',
  '#fbbf24',
  '#34d399',
  '#a78bfa',
  '#f472b6',
  '#22d3ee',
];

export function getLangColor(language, index = 0) {
  if (!language) return '#66748c';
  return LANG_COLORS[language] ?? FALLBACK[index % FALLBACK.length];
}
