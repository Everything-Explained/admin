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
    <>
      <header class="my-7 text-center text-4xl">Panel Selection</header>
      <div class="home__container mx-10 mt-4 gap-6">
        <NavCard to="/login" title="Literature">
          Allows you to manage literature entires: You can update, add, or delete them. This
          also includes publishing or unpublishing them, depending on your access level.
        </NavCard>
        <NavCard to="/" disabled={true} title="Logs">
          Allows you to manage the server logs: You can download or delete them.
        </NavCard>
        <NavCard to="/" disabled={true} title="Users">
          Allows you to manage users: You can add, update, or delete them.
        </NavCard>
      </div>
    </>
  );
}
