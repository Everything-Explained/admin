import './users.css';
import { For, Show, createSignal } from 'solid-js';
import { MockDatabaseUser } from '../__mocks__/mock_db-user';
import { User, UserAccessLevel, useUserDatabase } from '../database/db-user';
import { useAccessLevelColors } from '../utils/colors';

export function Users() {
  const userDB = useUserDatabase(new MockDatabaseUser());
  const [users, setUsers] = createSignal<User[]>([]);

  function getColor(accessLevel: UserAccessLevel) {
    return useAccessLevelColors().getColor(`${accessLevel}`);
  }

  userDB.users.then((res) => {
    const [error, users] = res;
    if (error == null) {
      setUsers(
        users.toSorted((a, b) => {
          return b.accessLevel - a.accessLevel;
        }),
      );
    }
  });

  return (
    <>
      <header class="my-7 text-center text-4xl">Users</header>
      <div class="mx-auto flex min-w-0 max-w-xl flex-col gap-8 text-xl">
        <Show when={users().length}>
          <For each={users()}>
            {(user) => (
              <div class="users__item flex flex-row gap-4 rounded-lg bg-gray-700/20 p-3">
                <div class={`flex-1 font-normal text-slate-200`}>{user.username}</div>
                <div class="users__access-level">
                  <span
                    class={`${'rounded-md border-2 border-black px-2'} ${getColor(
                      user.accessLevel,
                    ).join(' ')}`}
                  >
                    <span class="relative top-[-1px]">
                      {getAccessLevelStr(user.accessLevel)}
                    </span>
                  </span>
                </div>
              </div>
            )}
          </For>
        </Show>
      </div>
    </>
  );
}

function getAccessLevelStr(level: UserAccessLevel) {
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
