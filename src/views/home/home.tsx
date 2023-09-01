import { useBeforeLeave, useNavigate } from '@solidjs/router';
import { useGlobalProgress } from '../../components/ui/global-progress';
import './home.css';
import { NavCard } from '../../components/nav-card';

export function Home() {
    const nav = useNavigate();
    const [startProgress, stopProgress] = useGlobalProgress();

    // useBeforeLeave(() => {
    //     startProgress();
    // });

    return (
        <div class="home__container mt-[10vh] gap-6">
            <NavCard to="/login" title="Literature">
                Allows you to manage literature entires: update, add, or delete them. This also
                includes publishing or unpublishing them, depending on your access level.
            </NavCard>
            <NavCard to="/" disabled={true} title="Logs">
                Allows you to manage the server logs: download or delete them.
            </NavCard>
            <NavCard to="/" disabled={true} title="Logs">
                Allows you to manage users: add, update, or delete them.
            </NavCard>
        </div>
    );
}
