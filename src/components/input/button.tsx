export type BtnSize = 'lg' | 'md' | 'sm';
import { createMemo } from 'solid-js';
import './button.css';

type BtnProps = {
  color?: ColorType;
  disabled?: boolean;
  loading?: boolean;
  children: string;
  click: () => void;
};

export const Button = (props: BtnProps) => {
  const { click, color, children } = props;
  const colorType = color ?? 'neutral';

  const isLoading = createMemo(() => {
    return props.loading;
  });

  return (
    <button
      type="button"
      disabled={isLoading() ? true : props.disabled ?? false}
      onclick={click}
      class="btn relative select-none rounded-md px-3 py-1 font-semibold uppercase"
      classList={{
        [`btn--${colorType}`]: !props.disabled,
        'btn--loading': isLoading(),
      }}
    >
      {children}
    </button>
  );
};
