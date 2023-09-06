import { useNavigate } from '@solidjs/router';
import './nav-card.css';
import { Button } from './ui/button';

type NavCardProps = {
  children: string;
  title: string;
  to: string;
  disabled?: boolean;
};

export function NavCard({ children, title, disabled, to }: NavCardProps) {
  const isDisabled = disabled ?? false;
  const nav = useNavigate();

  const notImplemented = <span class="font-normal text-rose-400">NOT IMPLEMENTED.</span>;

  return (
    <div class="nav-card inline-block rounded-lg bg-gray-700/20">
      <h1 class="m-0 text-3xl text-yellow-400">{title}</h1>
      <p class="pb-6 pt-4 text-center text-xl">
        {isDisabled ? notImplemented : ''} {children}
      </p>
      <Button
        disabled={isDisabled}
        color="good"
        click={() => {
          nav(to);
        }}
      >
        Go
      </Button>
    </div>
  );
}
