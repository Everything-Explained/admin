import { Accessor, createSignal } from 'solid-js';
import { DBEntry, DBResponse } from '../database/db';
import { User } from '../database/db-user';
import users from './users.json';

export class MockDatabaseUser implements DBEntry<User> {
  #users = createSignal<User[]>([]);
  entries = this.#users[0];

  constructor(private url: URL) {}

  loadEntries(): DBResponse<true> {
    const [, setUsers] = this.#users;
    setUsers(users satisfies User[]);
    return Promise.resolve([null, true]);
  }

  findByID(id: string): User | null {
    throw new Error('Method not implemented.');
  }

  fuzzyFind(name: string): User[] | null {
    return this.entries().filter((v) => v.username.includes(name)) ?? null;
  }

  delete<K>(id: string): DBResponse<K> {
    throw new Error('Method not implemented.');
  }

  add<K>(id: string): DBResponse<K> {
    throw new Error('Method not implemented.');
  }

  edit<K>(entry: User): DBResponse<K> {
    throw new Error('Method not implemented.');
  }
}
