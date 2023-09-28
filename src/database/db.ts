import { Accessor } from 'solid-js';

export type DBResponse<T> = Promise<[error: string, null] | [null, T]>;

export interface DBEntry<T> {
  entries: Accessor<T[]>;
  findByID(id: string, context?: string): T | null;
  fuzzyFind(entryProp: string, context?: string): T[] | null;
  loadEntries(type?: string): DBResponse<true>;
  delete<K>(id: string, context?: string): DBResponse<K>;
  add<K>(id: string, context?: string): DBResponse<K>;
  edit<K>(entry: T, context?: string): DBResponse<K>;
}
