import { createSignal } from 'solid-js';
import Counter from './counter';
import { Button } from './ui/button';

export const ArticlePanel = () => {
    const [isToggled, setToggle] = createSignal(false);

    return (
        <>
            {!isToggled() ? <Counter id="1" /> : <Counter id="2" />}
            &nbsp;
            <Button click={() => setToggle((v) => !v)}>Swap</Button>
        </>
    );
};
