import { createSignal } from 'solid-js';
import { Avatar } from './avatar';
import { Link } from './link';
import { UserAccessLevel } from '../database/db-user';

export const profileAccessLevel = createSignal<UserAccessLevel>(0);

export function ProfileButton() {
  // TODO: Use auth utility to validate logged-in status

  const isAuthed = false;
  const [accessLevel] = profileAccessLevel;

  return (
    <Link to={isAuthed ? '/profile' : '/login'}>
      <Avatar accessLevel={accessLevel()} />
    </Link>
  );
}
