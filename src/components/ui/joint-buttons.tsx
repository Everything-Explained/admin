import { Accessor, For, Show, onMount } from 'solid-js';
import { BtnSize, Button } from './button';
import { ToolTip } from './tooltip';

type JBProps = {
    color: ThemeColors;
    names: string[];
    clickHandlers: Array<() => void>;
    toolTips?: Array<{ text: string; color: ThemeColors } | null>;
    size?: BtnSize;
};

export function JointButtons({ color, names, size, toolTips, clickHandlers }: JBProps) {
    onMount(() => {
        if (clickHandlers.length < names.length) {
            throw Error('Not enough Click Handlers for the amount of Buttons');
        }

        if (toolTips && toolTips.length > 0 && toolTips.length < names.length) {
            throw Error(
                `There's only ${toolTips.length} TOOLTIP(S) for ${names.length} BUTTONS`
            );
        }
    });

    function DefaultButton(name: string, i: Accessor<number>) {
        return (
            <Button color={color} size={size} joint={true} click={clickHandlers[i()]}>
                {name}
            </Button>
        );
    }

    return (
        <div class="join">
            <For each={names}>
                {(name, i) => (
                    <Show when={toolTips && toolTips[i()]} fallback={DefaultButton(name, i)}>
                        {(tip) => (
                            <ToolTip tip={tip().text} type={tip().color}>
                                {DefaultButton(name, i)}
                            </ToolTip>
                        )}
                    </Show>
                )}
            </For>
        </div>
    );
}
