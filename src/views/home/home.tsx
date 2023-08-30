import { useBeforeLeave, useNavigate } from '@solidjs/router';
import { useGlobalProgress } from '../../components/ui/global-progress';
import { Button } from '../../components/ui/button';

export function Home() {
    const nav = useNavigate();
    const [startProgress, stopProgress] = useGlobalProgress();

    useBeforeLeave(() => {
        startProgress();
    });

    return (
        <div class="text-center">
            <h1 class="text-5xl font-bold">Admin Panel</h1>
            <p class="py-6 text-xl">Please select a destination below!</p>
            <span class="mr-4">
                <Button
                    color="info"
                    click={() => {
                        console.log('hello world');
                    }}
                >
                    Literature
                </Button>
            </span>
            <Button
                color="error"
                click={() => {
                    console.log('logs');
                }}
            >
                Logs
            </Button>
        </div>
    );
}
