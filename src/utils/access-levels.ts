import { UserAccessLevel } from '../database/db-user';

const accessLevels = ['Admin', 'Moderator', 'Head Writer', 'Senior Writer', 'Writer'];

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

export function useAccessLevels() {
  return accessLevels.slice(0);
}

export function useAccessLevelStr(level: UserAccessLevel) {
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
  }
}
