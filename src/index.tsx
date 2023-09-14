import { render } from 'solid-js/web';
import './index.css';

import { Home } from './views/home/home';
import { Route, Router, Routes } from '@solidjs/router';
import { GlobalProgress } from './components/ui/global-progress';
import { Login } from './views/login/login';
import { LoginRouteGuard } from './components/login-route-guard';
import { PageNotFound } from './views/404';
import { Titlebar } from './components/titlebar';
import { Profile } from './views/profile';
import { Users } from './views/users';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  const h = () => {
    console.log('hello world');
  };
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? ' +
      'Or maybe the id attribute got misspelled?',
  );
}

render(
  () => (
    <>
      <GlobalProgress />
      <Router>
        <Titlebar />
        <Routes>
          <Route path="/login" component={Login} />
          <Route path="/" component={LoginRouteGuard}>
            <Route path="/" component={Home} />
            <Route path="/users" component={Users} />
          </Route>
          <Route path="/profile" component={Profile} />
          <Route path="*" component={PageNotFound} />
        </Routes>
      </Router>
    </>
  ),
  root!,
);
