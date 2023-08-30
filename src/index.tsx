import { render } from 'solid-js/web';
import './index.css';

import { Home } from './views/home/home';
import { Route, Router, Routes } from '@solidjs/router';
import { GlobalProgress } from './components/ui/global-progress';
import { Literature } from './views/literature';
import { Login } from './views/login';
import { LoginRouteGuard } from './components/login-route-guard';
import { PageNotFound } from './views/404';

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
                <Routes>
                    <Route path="/login" component={Login} />
                    <Route path="/" component={LoginRouteGuard}>
                        <Route path="/" component={Home} />
                        <Route path="/literature" component={Literature} />
                    </Route>
                    <Route path="*" component={PageNotFound} />
                </Routes>
            </Router>
        </>
    ),
    root!,
);
