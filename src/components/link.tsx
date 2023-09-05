import { useNavigate } from '@solidjs/router';
import { Match, Switch } from 'solid-js';

type LinkProps = {
  to: string;
  children: any;
};

export function Link({ to, children }: LinkProps) {
  const nav = useNavigate();
  const isExternal = !to.startsWith('/');
  const isProperLink = to.startsWith('http://') || to.startsWith('https://');

  if (isExternal && !isProperLink) {
    throw Error('External links must begin with http:// or https://');
  }

  function handleClick(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    nav(to);
  }

  return (
    <Switch>
      <Match when={!isExternal}>
        <a href={to} onClick={handleClick}>
          {children}
        </a>
      </Match>
      <Match when={isExternal}>
        <a href={to} target="_blank">
          {children}
        </a>
      </Match>
    </Switch>
  );
}
