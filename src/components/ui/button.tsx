export type BtnSize = 'lg' | 'md' | 'sm';

type BtnProps = {
    type?: 'primary' | 'secondary' | 'accent' | 'info' | 'warning' | 'error';
    size?: BtnSize;
    joint?: boolean;
    disabled?: boolean;
    children: string;
    click: () => void;
};

export const Button = ({ click, disabled, type, size, joint, children }: BtnProps) => {
    const isDisabled = disabled ?? false;
    const btnType = type ?? 'neutral';
    const isJoint = joint ?? false;
    const btnSize = size ?? 'sm';

    return (
        <button
            type="button"
            disabled={isDisabled}
            onclick={click}
            class="btn btn-outline btn-neutral"
            classList={{
                [`btn-${btnType}`]: true,
                [`btn-${btnSize}`]: true,
                'join-item': isJoint,
            }}
        >
            {children}
        </button>
    );
};
