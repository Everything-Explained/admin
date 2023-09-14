import { createEffect, createMemo, createSignal } from 'solid-js';
import { UserAccessLevel } from '../database/db-user';
import { useAccessLevelColors } from '../utils/access-levels';

type AvatarProps = {
  accessLevel?: UserAccessLevel;
};

export function Avatar(props: AvatarProps) {
  const accessLevel = createMemo(() => {
    return props.accessLevel;
  });

  const [bgColor, setBgColor] = createSignal('');
  const [textColor, setTextColor] = createSignal('');

  createEffect(() => {
    const level = accessLevel() ?? 0;
    if (level > -1) {
      const [bg, fg] = useAccessLevelColors(`${level}`);
      setBgColor(bg);
      if (level == 0) {
        setTextColor(fg);
        return;
      }
      setTextColor(level >= UserAccessLevel.MODERATOR ? 'text-yellow-400' : 'text-zinc-950');
    }
  });

  return (
    <div class={`relative h-10 w-10 overflow-hidden rounded-full ${bgColor()}`}>
      <svg
        class={`absolute -left-1 h-12 w-12 ${textColor()}`}
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
