import { UserAccessLevel } from '../database/db-user';

const accessLevels = ['Admin', 'Moderator', 'Head Writer', 'Senior Writer', 'Writer'];

const accessLevelColors = {
  '1': ['bg-sky-400', 'text-black'],
  '2': ['bg-emerald-400', 'text-black'],
  '4': ['bg-fuchsia-400', 'text-black'],
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
