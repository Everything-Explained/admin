import { Outlet, useNavigate } from '@solidjs/router';

export function LoginRouteGuard() {
  const nav = useNavigate();

  const needsLogin = true;

  // if (needsLogin) {
  //     nav('/login', { replace: true });
  //     return null;
  // }

  return <Outlet />;
}
