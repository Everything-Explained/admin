import { createMemo } from 'solid-js';

type AvatarProps = {
  authed: boolean;
};

export function Avatar(props: AvatarProps) {
  return (
    <div
      class="relative h-10 w-10 overflow-hidden rounded-full"
      classList={{
        'bg-gray-700': !props.authed,
        'bg-rose-600': props.authed,
      }}
    >
      <svg
        class="absolute -left-1 h-12 w-12"
        classList={{
          'text-slate-400': !props.authed,
          'text-yellow-400': props.authed,
        }}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
  );
}
