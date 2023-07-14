export type BtnSize = 'lg' | 'md' | 'sm';

type BtnProps = {
    color?: ThemeColors;
    size?: BtnSize;
    joint?: boolean;
    disabled?: boolean;
    children: string;
    click: () => void;
};

export const Button = ({ click, disabled, color, size, joint, children }: BtnProps) => {
    const isDisabled = disabled ?? false;
    const btnColor = color ?? 'neutral';
    const isJoint = joint ?? false;
    const btnSize = size ?? 'sm';

    return (
        <button
            type="button"
            disabled={isDisabled}
            onclick={click}
            class="btn btn-outline btn-neutral"
            classList={{
                [`btn-${btnColor}`]: true,
                [`btn-${btnSize}`]: true,
                'join-item': isJoint,
            }}
        >
            {children}
        </button>
    );
};
