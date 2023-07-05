type TTProps = {
    tip: string;
    children: any;
    type?: ThemeColors;
};

export function ToolTip({ tip, children, type }: TTProps) {
    const tipType = type ?? 'primary';

    return (
        <div
            class="tooltip tooltip-top font-bold"
            classList={{ [`tooltip-${tipType}`]: true }}
            data-tip={tip}
        >
            {children}
        </div>
    );
}
