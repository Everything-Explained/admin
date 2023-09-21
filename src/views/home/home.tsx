import { useBeforeLeave, useNavigate } from '@solidjs/router';
import { useGlobalProgress } from '../../components/ui/global-progress';
import './home.css';
import { NavCard } from '../../components/nav-card';

export function Home() {
  // const [startProgress, stopProgress] = useGlobalProgress();

  // useBeforeLeave(() => {
  //   startProgress();
  // });

  return (
    <>
      <header class="my-7 text-center text-4xl">Panel Selection</header>
      <div class="home__container mx-10 mt-4 gap-6">
        <NavCard to="/literature" title="Literature">
          Allows you to manage literature entires: You can update, add, delete, publish, or
          unpublish them, depending on your access level.
        </NavCard>
        <NavCard to="/videos" title="Videos">
          Allows you to manage video entires: you can update, add, delete, publish, or unpublish
          them, depending on your access level.
        </NavCard>
        <NavCard to="/" disabled={true} title="Logs">
          Allows you to manage the server logs: You can download or delete them.
        </NavCard>
        <NavCard to="/users" title="Users">
          Allows you to manage users: You can add, update, or delete them.
        </NavCard>
      </div>
    </>
  );
}
