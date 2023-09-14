import './titlebar.css';
import { Logo } from './logo';
import { Link } from './link';
import { ProfileButton } from './profile-button';

export function Titlebar() {
  return (
    <>
      <div class="titlebar__container flex gap-2 border-neutral-800">
        <Link to="/">
          <header class="flex__vcenter gap-3 px-2 py-2 text-2xl">
            <Logo />
            <span class="font-semibold text-red-500">
              EvEx<span class="font-normal text-yellow-400">-Admin</span>
            </span>
          </header>
        </Link>
        <div class="flex__vcenter flex-1 justify-end rounded-e-lg rounded-s-lg">
          <span class="mr-2">
            <ProfileButton />
          </span>
        </div>
      </div>
    </>
  );
}
