import { Avatar } from './avatar';
import { Link } from './link';

export function ProfileButton() {
  // TODO: Use auth utility to validate logged-in status

  const isAuthed = false;

  return (
    <Link to={isAuthed ? '/profile' : '/login'}>
      <Avatar authed={isAuthed} />
    </Link>
  );
}
