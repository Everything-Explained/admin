import './login.css';
import { createMemo, createSignal } from 'solid-js';
import { Button } from '../../components/ui/button';
import { Input, InputConditions } from '../../components/ui/input';
import { useGlobalProgress } from '../../components/ui/global-progress';

type InputState<T> = [isValid: boolean, val: T];

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

  return (
    <form class="login_container mx-auto mt-[10vh] max-w-[20rem] rounded-lg bg-gray-700/20">
      <h1 class="mb-1 text-center text-yellow-400">Login</h1>
      <p class="my-2">In order to use the admin panel, you must login.</p>
      <LoginForm />
    </form>
  );
}

function LoginForm() {
  const [usernameState, setUsernameState] = createSignal<InputState<string>>([false, '']);
  const [passwordState, setPasswordState] = createSignal<InputState<string>>([false, '']);

  const isFormValid = createMemo(() => {
    return usernameState()[0] && passwordState()[0];
  });

  function submit() {
    console.log('hello world');
  }

  return (
    <>
      <Input
        type="text"
        minlength={3}
        maxlength={20}
        conditions={[InputConditions.noWhitespace, InputConditions.lettersOnly]}
        onChange={(isValid, val) => setUsernameState([isValid, val])}
      >
        First Name or Alias
      </Input>
      <Input
        type="password"
        conditions={[
          InputConditions.needNumber,
          InputConditions.needLowercase,
          InputConditions.needUppercase,
        ]}
        onChange={(isValid, val) => setPasswordState([isValid, val])}
        minlength={6}
      >
        Password
      </Input>
      <div class="text-right">
        <span class="">
          <Button color="attention" disabled={!isFormValid()} click={submit}>
            Login
          </Button>
        </span>
      </div>
    </>
  );
}
