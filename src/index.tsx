import { render } from 'solid-js/web';
import './reset.css';
import './index.css';

import { Home } from './views/home/home';
import { Route, Router, Routes } from '@solidjs/router';
import { ArticlePanel } from './components/article-panel';
import { GlobalProgress, useGlobalProgress } from './components/ui/global-progress';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    const h = () => {
        console.log('hello world');
    };
    throw new Error(
        'Root element not found. Did you forget to add it to your index.html? ' +
            'Or maybe the id attribute got misspelled?'
    );
}

render(
    () => (
        <>
            <GlobalProgress />
            <Router>
                <Routes>
                    <Route path="/" component={Home} />
                    <Route path="/literature" component={ArticlePanel} />
                </Routes>
            </Router>
        </>
    ),
    root!
);
