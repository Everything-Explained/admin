import { Match, Switch } from 'solid-js';

type IconProps = {
  type: 'plus' | 'search';
  class?: string;
  click?: () => void;
};

export function Icon({ click, type, class: classStr }: IconProps) {
  classStr += click ? ' cursor-pointer active:top-[2px] active:left-[2px]' : '';
  return (
    <div
      onclick={click}
      class="relative inline-block select-none p-1 text-5xl transition-colors duration-200 ease-in-out"
      classList={{
        [`${classStr}`]: true,
      }}
    >
      <Switch>
        <Match when={type == 'plus'}>
          <svg width="32" height="32" viewBox="0 0 15 15">
            <path fill="none" stroke="currentColor" d="M7.5 1v13M1 7.5h13" />
          </svg>
        </Match>
        <Match when={type == 'search'}>
          <svg width="32" height="32" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
            />
          </svg>
        </Match>
      </Switch>
    </div>
  );
}
