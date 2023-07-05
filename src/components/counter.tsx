import { createEffect, createSignal } from 'solid-js';
import { Button } from './ui/button';

let id = 0;

export default function Counter(props: { id: string }) {
    const [getCount, setCount] = useLocalStorage(props.id, 0);

    return (
        <>
            <div>&nbsp;</div>
            <div>ID: {props.id}</div>
            <div>Count: {getCount()}</div>
            <Button click={() => setCount((c) => c + 1)}>Increment</Button>
        </>
    );
}

function useLocalStorage(id: string, initial: number) {
    const storedVal = localStorage.getItem(id);
    const count = (storedVal && parseInt(storedVal)) || initial;
    const [getCount, setCount] = createSignal(count);

    if (count == 0) {
        localStorage.setItem(id, '0');
    }

    createEffect(() => {
        localStorage.setItem(id, getCount().toString());
    });

    return [getCount, setCount] as const;
}
