import './switch-field.css';
import { genID } from '../../utils/gen-id';
import { createMemo, createSignal } from 'solid-js';

type SwitchProps = {
  checked: boolean;
  children: string;
  onChange: (isValid: boolean, val: boolean) => void;
};

export function SwitchField({ children, checked, onChange }: SwitchProps) {
  const id = genID();
  const [isChecked, setChecked] = createSignal(checked);
  const [hasChanged, setHasChanged] = createSignal(false);

  const activeColor = createMemo(() => {
    return hasChanged()
      ? 'border-emerald-400 text-emerald-400'
      : 'border-neutral-500 text-neutral-500';
  });

  function onChecked(e: Event) {
    const el = e.target as HTMLInputElement;
    setChecked(el.checked);
    setHasChanged(el.checked != checked);
    onChange(hasChanged(), isChecked());
  }

  return (
    <>
      <div class={`min-w-fit max-w-fit border-b-[1px] px-1 transition-colors ${activeColor()}`}>
        <label
          for={id}
          class={`cursor-pointer select-none pr-10 font-medium transition-colors ${activeColor()}`}
        >
          {children}
        </label>
        <input
          onChange={onChecked}
          id={id}
          class="switch__checkbox hidden"
          type="checkbox"
          checked
        />
        <label
          for={id}
          class="switch-input"
          classList={{
            'bg-neutral-600 after:border-neutral-600': !isChecked(),
            'bg-yellow-500 after:border-yellow-500': isChecked(),
          }}
        />
      </div>
    </>
  );
}
