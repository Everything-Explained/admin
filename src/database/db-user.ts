import { DBEntry } from './db';

export enum UserAccessLevel {
  GUEST = 0,
  WRITER = 1,
  SENIORWRITER = 2,
  HEADWRITER = 4,
  MODERATOR = 8,
  ADMIN = 16,
}

export type User = {
  id: string;
  username: string;
  accessLevel: UserAccessLevel;
};

export function useUserDatabase(db: DBEntry<User>) {
  return db;
}
