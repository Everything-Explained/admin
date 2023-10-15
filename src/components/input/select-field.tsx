import { For, createMemo, createSignal, onCleanup, onMount } from 'solid-js';
import './select-field.css';

type SelectProps = {
  items: string[];
  /** Defaults to -1 (None) */
  selectedIndex?: number;
  /** Select Title */
  children: string;
  width?: string;
  onChange: (val: number) => void;
};

export function SelectField(props: SelectProps) {
  const { items, children, width, onChange, selectedIndex } = props;
  let elSelect: HTMLDivElement | undefined;
  const maxHeight = `${items.length * 3}rem`;
  const [open, setOpenState] = createSignal(false);
  const [title, setTitle] = createSignal(children);
  const [selectedItem, setSelectedIndex] = createSignal(selectedIndex ?? -1);
  const isDefault = createMemo(() => {
    return title() == children || selectedItem() == selectedIndex;
  });
  const selectWidth = width ?? '200px';

  const adjustedItems = ['None', ...items];

  document.addEventListener('mousedown', closeSelection);

  onMount(() => {
    setSelection(selectedIndex ?? -1);
    if (elSelect) {
      document.documentElement.style.setProperty('--select-max-height', maxHeight);
      document.documentElement.style.setProperty('--select-width', selectWidth);
    }
  });

  function setSelection(index: number) {
    onChange(index);
    setSelectedIndex(index);
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
        class="__select relative flex cursor-pointer select-none items-center gap-4 px-1 capitalize"
        classList={{
          '--open': open(),
          'border-zinc-500': isDefault(),
          'border-emerald-300': !isDefault(),
        }}
        onmousedown={toggleOpen}
      >
        <label
          class="cursor-pointer font-normal transition-colors duration-300"
          classList={{ 'text-zinc-500': isDefault(), 'text-emerald-300': !isDefault() }}
        >
          {title()}
        </label>
        <div class="flex-1 text-right">
          <div class="select__arrow inline-block bg-zinc-500 text-right"></div>
        </div>
        <div class="select__items absolute left-0 top-full max-h-0 w-full overflow-hidden rounded-b-lg bg-gray-700/95 capitalize">
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
