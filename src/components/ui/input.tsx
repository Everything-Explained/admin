import {
    For,
    Match,
    Show,
    Signal,
    Switch,
    createEffect,
    createMemo,
    createSignal,
} from 'solid-js';
import './input.css';
import { Transition } from 'solid-transition-group';
import { genID } from '../../utils/gen-id';

type InputProps = {
    minlength?: number;
    maxlength?: number;
    classes?: string;
    conditions?: InputCondition[];
    type: 'text' | 'password';
    clearSignal?: Signal<boolean>;
    children: string;
};

export type InputCondition = [msg: string, test: RegExp];

export function Input({
    minlength,
    maxlength,
    children,
    clearSignal,
    conditions,
    type,
    classes,
}: InputProps) {
    const minLen = minlength ?? -1;
    const maxLen = maxlength ?? -1;
    const hasFixedLen = minLen > 0 || maxLen > 0;
    const customClasses = classes ?? '';
    const testConditions = conditions ?? [];
    const inputID = genID();
    let myInput: HTMLInputElement | undefined;

    const [chars, setChars] = createSignal(0);
    if (clearSignal) {
        const [clearVal] = clearSignal;
        createEffect(() => {
            if (clearVal() && myInput) {
                myInput.value = '';
                onInput();
            }
        });
    }

    const hasValidInputLength = createMemo(() => {
        return chars() >= minLen || chars() == 0;
    });

    const [userInput, setUserInput] = createSignal('');
    const [isValidInput, setInputValidity] = createSignal(true);

    function onInput() {
        if (hasFixedLen && myInput) {
            setChars(myInput.value.length);
        }

        if (myInput) {
            setUserInput(myInput.value);
        }
    }

    function validateInput(ex: RegExp, testStr: string) {
        const val = ex.test(testStr);
        setInputValidity(val);
        return val;
    }

    return (
        <div class={`relative mb-8 ${customClasses}`}>
            <input
                id={inputID}
                class="textbox mt-5 w-full border-b-[1px] bg-transparent text-emerald-300"
                classList={{
                    'border-b-zinc-500': chars() < minLen || !isValidInput(),
                    'border-b-emerald-300': chars() >= minLen,
                }}
                placeholder="placeholder"
                type={type}
                maxLength={maxLen}
                oninput={onInput}
                onemptied={onInput}
                ref={myInput}
            />

            {/* Animated Label on Input Focus */}
            <label
                class="textbox__label absolute top-0 pl-1 font-normal"
                classList={{
                    'text-slate-300': hasValidInputLength() && isValidInput(),
                    'text-rose-400': !hasValidInputLength() || !isValidInput(),
                }}
                for={inputID}
            >
                {children}
            </label>

            {/* Animated Border on Input Focus */}
            <span
                class="textbox__bar absolute bottom-[-1px] left-0 h-[2px] w-0"
                classList={{
                    'bg-zinc-500': chars() < minLen || !isValidInput(),
                    'bg-emerald-300': chars() >= minLen && isValidInput(),
                }}
            ></span>

            {/* Character Tally */}
            <Transition name="slide-fade">
                <Show when={maxLen > 0 && chars() > 0}>
                    <span
                        class="text-md absolute -bottom-[1.5rem] right-0 font-normal transition-all"
                        classList={{
                            'text-emerald-300': hasValidInputLength() && chars() < maxLen,
                            'text-yellow-300': chars() == maxLen,
                            'text-rose-400': !hasValidInputLength(),
                        }}
                    >
                        {chars()} / {maxLen}
                    </span>
                </Show>
            </Transition>

            {/* Minimum Character Message */}
            <Transition name="slide-fade">
                <Switch>
                    <Match when={chars() < minLen && chars() > 0}>
                        <span class="text-md absolute bottom-[-1.5rem] left-[0.5rem] font-normal text-rose-400">
                            <span class="text-yellow-300">{minLen - chars()}</span>
                            &nbsp;more chars required
                        </span>
                    </Match>
                    <For each={testConditions}>
                        {(c) => (
                            <Match when={chars() > 0 && !validateInput(c[1], userInput())}>
                                <span class="absolute bottom-[-1.5rem] left-[0.5rem] font-normal text-rose-400">
                                    {c[0]}
                                </span>
                            </Match>
                        )}
                    </For>
                </Switch>
            </Transition>
        </div>
    );
}
