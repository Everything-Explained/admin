import { Accessor } from 'solid-js';

export type DBResponse<T> = Promise<[error: string, null] | [null, T]>;

export interface DBEntry<T> {
  entries: Accessor<T[]>;
  findByID(id: string): T | null;
  fuzzyFind(entryProp: string): T[] | null;
  loadEntries(): DBResponse<boolean>;
  delete<K>(id: string): DBResponse<K>;
  add<K>(id: string): DBResponse<K>;
  edit<K>(entry: T): DBResponse<K>;
}
