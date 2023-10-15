import { UserAccessLevel } from '../database/db-user';

const accessLevelColors = {
  '0': ['bg-gray-700', 'text-slate-400'],
  '1': ['bg-sky-300', 'text-black'],
  '2': ['bg-emerald-300', 'text-black'],
  '4': ['bg-fuchsia-500', 'text-white'],
  '8': ['bg-violet-700', 'text-white'],
  '16': ['bg-rose-600', 'text-white'],
} as const;

export function useAccessLevelColors(level: keyof typeof accessLevelColors) {
  return accessLevelColors[level];
}

export function useAccessLevel() {
  const als: { value: UserAccessLevel; label: string; index: number }[] = [];
  let i = 0;
  for (const key in UserAccessLevel) {
    // We ignore 0 because Guest is not a valid assignment
    if (!isNaN(+key) && key != '0') {
      als.push({
        value: +key,
        label: levelToLabel(+key),
        index: i,
      });
      i++;
    }
  }

  function levelToLabel(level: UserAccessLevel) {
    switch (level) {
      case UserAccessLevel.WRITER:
        return 'writer';
      case UserAccessLevel.SENIORWRITER:
        return 'senior writer';
      case UserAccessLevel.HEADWRITER:
        return 'head writer';
      case UserAccessLevel.MODERATOR:
        return 'moderator';
      case UserAccessLevel.ADMIN:
        return 'admin';
      default:
        throw Error('useAccessLevel()::Access Level Undefined');
    }
  }

  return {
    levels: als.map((v) => v.label),
    length: als.length,
    toString(level: UserAccessLevel) {
      const accessLvl = als.find((l) => l.value == level);
      if (!accessLvl) throw Error('useAccessLevel()::Access Level Undefined');
      return accessLvl.label;
    },
    toIndex(level: UserAccessLevel) {
      const accessLvl = als.find((l) => l.value == level);
      if (!accessLvl) throw Error('useAccessLevel()::Access Level Undefined');
      return accessLvl.index;
    },
    fromIndexToValue(index: number) {
      const accessLvl = als.find((l) => l.index == index);
      if (!accessLvl) throw Error('useAccessLevel()::Index Undefined');
      return accessLvl.value;
    },
  };
}
