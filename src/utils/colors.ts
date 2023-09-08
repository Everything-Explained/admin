const accessLevelColors = {
  '1': ['bg-sky-400', 'text-black'],
  '2': ['bg-emerald-400', 'text-black'],
  '4': ['bg-fuchsia-400', 'text-black'],
  '8': ['bg-violet-700', 'text-white'],
  '16': ['bg-rose-600', 'text-white'],
} as const;

export function useAccessLevelColors() {
  return {
    getColor: (level: keyof typeof accessLevelColors) => {
      return accessLevelColors[level];
    },
  };
}
