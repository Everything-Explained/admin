import './users.css';
import { For, Show, createComputed, createEffect, createMemo, createSignal } from 'solid-js';
import { MockDatabaseUser } from '../__mocks__/mock_db-user';
import { User, UserAccessLevel, useUserDatabase } from '../database/db-user';
import { Input, InputCondition } from '../components/ui/input';
import { Select } from '../components/select';
import { Button } from '../components/ui/button';
import {
  useAccessLevelColors,
  useAccessLevelStr,
  useAccessLevels,
} from '../utils/access-levels';

type InputState<T> = [isValid: boolean, val: T];

export function Users() {
  const userDB = useUserDatabase(new MockDatabaseUser());
  const [users, setUsers] = createSignal<User[]>([]);
  const [openID, setOpenID] = createSignal(-1);

  userDB.users.then((res) => {
    const [error, users] = res;
    if (error == null) {
      const orderedUsers = users.toSorted((a, b) => {
        return b.accessLevel - a.accessLevel;
      });
      setUsers(orderedUsers);
    }
  });

  return (
    <>
      <header class="my-7 text-center text-4xl">Users</header>
      <div class="mx-auto flex min-w-0 max-w-lg flex-col text-xl">
        <Show when={users().length}>
          <For each={users()}>
            {(user, index) => (
              <>
                <div
                  class="users__item flex flex-row gap-4 rounded-lg bg-gray-700/20 text-slate-200"
                  onmousedown={() => setOpenID(index() == openID() ? -1 : index())}
                >
                  <div class="users-item__name flex-1 pb-2 pt-3 font-normal">
                    {user.username}
                  </div>
                  <AccessLevel level={user.accessLevel} />
                </div>
                <UsersEditPane
                  onSubmit={(form) => console.log(form)}
                  id={index()}
                  user={user}
                  open={openID()}
                />
              </>
            )}
          </For>
        </Show>
      </div>
    </>
  );
}

function AccessLevel({ level }: { level: UserAccessLevel }) {
  const accessLevelColors = useAccessLevelColors(`${level}`).join(' ');

  return (
    <div class="users__access-level">
      <span class={`${'flex rounded-md border-2 border-black'} ${accessLevelColors}`}>
        <span class="flex-1">{useAccessLevelStr(level)}</span>
      </span>
    </div>
  );
}

type EditPaneProps = {
  id: number;
  user: User;
  onSubmit: (formData: { username: string; accessLevel: number }) => void;
  /** ID of an edit pane */
  open: number;
};
function UsersEditPane(props: EditPaneProps) {
  const { id, user, onSubmit } = props;
  const noSpaces: InputCondition = ['No whitespace allowed', /\s/g, false];
  const lettersOnly: InputCondition = ['Only a-z or A-Z is allowed', /^[a-z\s]+$/gi, true];
  const [isLoading, setIsLoading] = createSignal(false);
  const hasExistingName: InputCondition = [
    'Name already exists',
    new RegExp(`^${user.username.toLowerCase()}$`, 'i'),
    false,
  ];

  const [userNameState, setUserNameState] = createSignal<InputState<string>>([false, '']);
  const [accessLevelState, setAccessLevelState] = createSignal<InputState<number>>([false, -1]);

  const isOpen = createMemo((val) => {
    return props.open < 0 ? false : props.open == id;
  });

  const isValidForm = createMemo(() => {
    const username = userNameState();
    if (!username[0] && username[1].length) {
      return false;
    }
    return username[0] || accessLevelState()[0];
  });

  function submit() {
    onSubmit({
      username: userNameState()[1],
      accessLevel: accessLevelState()[1],
    });
  }

  return (
    <div
      id={`wrapper${id}`}
      class="users__edit-wrapper mx-auto mb-8 w-[90%]"
      classList={{ '--editing': isOpen() }}
    >
      <div
        id={`edit${id}`}
        class="users__edit rounded-b-2xl pb-5"
        classList={{ '--editing': isOpen() }}
      >
        <div class="mx-auto flex w-[80%] flex-col px-3 py-1">
          <div class="w-[23ch] flex-1">
            <Input
              type="text"
              maxlength={20}
              minlength={4}
              conditions={[hasExistingName, noSpaces, lettersOnly]}
              onChange={(isValid, val) => setUserNameState([isValid, val])}
            >
              Edit Username
            </Input>
          </div>
          <div>
            <Select
              width="10.5rem"
              maxHeight="14.2rem"
              onChange={(val) => setAccessLevelState([val > -1, val])}
              items={useAccessLevels()}
            >
              Access Level
            </Select>
          </div>
        </div>
        <div class="pr-5 pt-6 text-right text-base">
          <Button
            color="attention"
            disabled={!isValidForm()}
            loading={isLoading()}
            click={submit}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
