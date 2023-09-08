export enum UserAccessLevel {
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

export type UserResponse<T> = Promise<[error: string, null] | [null, T]>;

export interface UserDatabase {
  get users(): UserResponse<User[]>;
  find(id: string): UserResponse<User>;
  delete(id: string): UserResponse<true>;
  add(user: User): UserResponse<true>;
  edit(user: User, key: keyof User): UserResponse<true>;
}

export function useUserDatabase(db: UserDatabase) {
  return db;
}
