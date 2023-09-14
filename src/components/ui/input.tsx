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
  onChange: (isValid: boolean, val: string) => void;
};

export type InputCondition = [msg: string, test: RegExp, expect: boolean];

export class InputConditions {
  static noWhitespace: InputCondition = ['No whitespace allowed', /\s/g, false];

  static lettersOnly: InputCondition = ['Only a-z or A-Z is allowed', /^[a-z\s]+$/gi, true];

  static needNumber: InputCondition = ['Missing a number', /\d/, true];

  static needLowercase: InputCondition = ['Missing 1 lowercase character', /[a-z]/, true];

  static needUppercase: InputCondition = ['Missing 1 uppercase character', /[A-Z]/, true];

  static isString(str: string): InputCondition {
    return [`"${str}" already exists`, new RegExp(`^${str}$`, 'i'), false];
  }
}

export function Input({
  minlength,
  maxlength,
  children,
  clearSignal,
  onChange,
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
      onChange(
        hasValidInputLength() && isValidInput() && !!myInput.value.length,
        myInput.value,
      );
    }
  }

  function validateInput(ex: RegExp, testStr: string, expect: boolean) {
    const val = expect ? !!testStr.match(ex) : !testStr.match(ex);
    setInputValidity(val);
    return val;
  }

  return (
    <div class={`relative pb-8 pt-5 ${customClasses}`}>
      <input
        id={inputID}
        class="textbox w-full border-b-[1px] bg-transparent text-emerald-300"
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
        class="textbox__label absolute top-0 select-none pl-1 font-normal"
        classList={{
          'text-slate-300': hasValidInputLength() && isValidInput(),
          'text-rose-400': !hasValidInputLength() || !isValidInput(),
        }}
        for={inputID}
      >
        {children}
      </label>

      {/* Animated Border on Input Focus */}
      <div
        class="textbox__bar relative top-[-1px] h-[2px] w-0"
        classList={{
          'bg-zinc-500': chars() < minLen || !isValidInput(),
          'bg-emerald-300': chars() >= minLen && isValidInput(),
        }}
      ></div>

      {/* Character Tally */}
      <Transition name="slide-fade">
        <Show when={maxLen > 0 && chars() > 0}>
          <span
            class="absolute bottom-[0.5rem] right-0 text-base font-normal transition-all"
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
            <span class="absolute bottom-[0.5rem] left-[0.5rem] text-base font-normal text-rose-400">
              <span class="text-yellow-300">{minLen - chars()}</span>
              &nbsp;more chars required
            </span>
          </Match>
          <For each={testConditions}>
            {(c) => (
              <Match when={chars() > 0 && !validateInput(c[1], userInput(), c[2])}>
                <span class="absolute bottom-[0.5rem] left-[0.5rem] text-base font-normal text-rose-400">
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
