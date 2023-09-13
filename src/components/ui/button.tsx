export type BtnSize = 'lg' | 'md' | 'sm';
import { createMemo, createSignal } from 'solid-js';
import './button.css';

type BtnProps = {
  color?: ColorType;
  disabled?: boolean;
  loading?: boolean;
  children: string;
  click: () => void;
};

export const Button = (props: BtnProps) => {
  const { click, disabled, color, children } = props;
  const isDisabled = disabled ?? false;
  const colorType = color ?? 'neutral';

  const isLoading = createMemo(() => {
    return props.loading;
  });

  return (
    <button
      type="button"
      disabled={isDisabled || isLoading()}
      onclick={click}
      class="btn relative select-none rounded-md font-semibold uppercase text-black"
      classList={{
        [`btn__${colorType}`]: !isDisabled,
        '--loading': isLoading(),
        'text-neutral-400': isDisabled && !isLoading(),
      }}
    >
      {children}
    </button>
  );
};
