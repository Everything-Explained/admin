import { User, UserDatabase, UserResponse } from '../database/db-user';
import users from './users.json';

export class MockDatabaseUser implements UserDatabase {
  get users(): UserResponse<User[]> {
    return Promise.resolve([null, users as User[]]);
  }

  find(id: string): UserResponse<User> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): UserResponse<true> {
    throw new Error('Method not implemented.');
  }

  add(user: User): UserResponse<true> {
    throw new Error('Method not implemented.');
  }

  edit(user: User, key: keyof User): UserResponse<true> {
    throw new Error('Method not implemented.');
  }
}
