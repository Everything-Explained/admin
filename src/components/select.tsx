import { For, createSignal, onCleanup, onMount } from 'solid-js';
import './select.css';

type SelectProps = {
  items: string[];

  /* CSS height value */
  maxHeight: string;

  /** Default Item */
  children: string;

  /** CSS width value */
  width?: string;

  onChange: (val: number) => void;
};

export function Select({ items, children, width, onChange, maxHeight }: SelectProps) {
  let elSelect: HTMLDivElement | undefined;
  const [open, setOpenState] = createSignal(false);
  const [title, setTitle] = createSignal(children);
  const selectWidth = width ?? '200px';

  const adjustedItems = ['None', ...items];

  document.addEventListener('mousedown', closeSelection);

  onMount(() => {
    if (elSelect) {
      document.documentElement.style.setProperty('--select-max-height', maxHeight);
      document.documentElement.style.setProperty('--select-width', selectWidth);
    }
  });

  function setSelection(index: number) {
    onChange(index);
    if (index == -1) return setTitle(children);
    setTitle(adjustedItems[index + 1]);
  }

  function closeSelection() {
    setOpenState(false);
  }

  function toggleOpen(e: MouseEvent) {
    e.preventDefault();
    e.stopImmediatePropagation();
    setOpenState(!open());
  }

  onCleanup(() => {
    closeSelection();
    document.removeEventListener('mousedown', closeSelection);
  });

  return (
    <>
      <div
        ref={elSelect}
        class="__select flex cursor-pointer gap-4 border-zinc-500 px-1"
        classList={{ '--open': open() }}
        onmousedown={toggleOpen}
      >
        <label class="cursor-pointer font-normal text-zinc-500">{title()}</label>
        <div class="flex-1 text-right">
          <div class="select__arrow bg-zinc-500"></div>
        </div>
        <div class="select__items bg-gray-700/95">
          <For each={adjustedItems}>
            {(item, index) => (
              <div onMouseDown={() => setSelection(index() - 1)} class="px-3 py-1 text-lg">
                {item}
              </div>
            )}
          </For>
        </div>
      </div>
    </>
  );
}
