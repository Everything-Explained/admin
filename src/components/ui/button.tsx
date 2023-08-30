export type BtnSize = 'lg' | 'md' | 'sm';
import './button.css';

type BtnProps = {
    color?: ColorType;
    disabled?: boolean;
    children: string;
    click: () => void;
};

export const Button = ({ click, disabled, color, children }: BtnProps) => {
    const isDisabled = disabled ?? false;
    const btnColor = color ?? 'neutral';

    return (
        <button
            type="button"
            disabled={isDisabled}
            onclick={click}
            class="btn relative select-none rounded-md font-extrabold uppercase text-black"
            classList={{
                [`btn__${btnColor}`]: !isDisabled,
            }}
        >
            {children}
        </button>
    );
};
