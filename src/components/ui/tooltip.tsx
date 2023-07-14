type TTProps = {
    tip: string;
    children: any;
    type?: ThemeColors;
};

export function ToolTip({ tip, children, type }: TTProps) {
    const tipType = type ?? 'primary';

    return (
        <div
            class="font-bold tooltip tooltip-top"
            classList={{ [`tooltip-${tipType}`]: true }}
            data-tip={tip}
        >
            {children}
        </div>
    );
}
