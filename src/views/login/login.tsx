import { createSignal } from 'solid-js';
import { Button } from '../../components/ui/button';
import { Input, InputCondition } from '../../components/ui/input';
import './login.css';
import { useGlobalProgress } from '../../components/ui/global-progress';

export function Login() {
    const signalClear = createSignal(false);

    const [startProgress, stopProgress] = useGlobalProgress();
    const [isLoading, setIsLoading] = createSignal(false);
    let isStarted = false;

    function toggleProgress() {
        (isStarted && stopProgress()) || startProgress();
        isStarted = !isStarted;
        setIsLoading(isStarted);
    }

    const passwordConditions: InputCondition[] = [
        ['Missing 1 number', /\d/],
        ['Missing 1 lowercase character', /[a-z]/],
        ['Missing 1 uppercase character', /[A-Z]/],
    ];

    return (
        <form class="login_container mx-auto mt-[10vh] max-w-[20rem] rounded-lg bg-gray-700/20">
            <h1 class="mb-1 text-center text-yellow-400">Login</h1>
            <p class="my-2">In order to use the admin panel, you must login.</p>
            <Input type="text" clearSignal={signalClear} minlength={4} maxlength={20}>
                Enter Username
            </Input>
            <Input
                type="password"
                conditions={passwordConditions}
                clearSignal={signalClear}
                minlength={6}
            >
                Enter Password
            </Input>
            <div class="text-right">
                <span class="">
                    <Button color="attention" click={() => console.log('loading')}>
                        Login
                    </Button>
                </span>
            </div>
        </form>
    );
}
