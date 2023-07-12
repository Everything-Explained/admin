import { createSignal, onMount } from 'solid-js';

const [progress, setProgress] = createSignal(0);
let progressBar!: HTMLDivElement;
let timeout: NodeJS.Timeout;

export const useGlobalProgress = () => [startProgress, stopProgress] as const;
const _widthAnimDuration = 375;
const _opacityAnimDuration = 175;

export function GlobalProgress() {
    const bar = document.querySelectorAll('#ProgressBar');
    if (bar && bar.length > 1) {
        throw Error('Only one Global Progress bar can be on the page at a time.');
    }

    return (
        <div
            id="ProgressBar"
            ref={progressBar}
            class="fixed inset-x-0 top-0 transition-opacity ease-in-out opacity-0"
            style={{
                'transition-duration': `${_opacityAnimDuration}ms`,
            }}
        >
            <div class="relative w-full h-1 bg-black bg-opacity-50 rounded-2xl">
                <div
                    class="absolute top-0 left-0 h-full ease-in-out bg-primary rounded-2xl"
                    style={{
                        width: `${progress()}%`,
                        'transition-property': 'width',
                        'transition-duration': `${_widthAnimDuration}ms`,
                    }}
                ></div>
            </div>
        </div>
    );
}

function startProgress(delay = 350) {
    if (progress() >= 100) {
        setProgress(() => 100);
        return;
    }

    if (progress() == 0) {
        progressBar.style.opacity = '1';
    }

    timeout = setTimeout(
        () => {
            setProgress((count) => {
                const v = Math.floor(
                    Math.random() * Math.floor(25 - (progress() / 100) * 23.5)
                );
                return count + v;
            });
            startProgress(Math.floor(Math.random() * delay + 50));
        },
        progress() == 0 ? 0 : delay
    );
}

function stopProgress() {
    clearTimeout(timeout);
    setProgress(() => 100);
    const hideProgressDelay = Math.floor((_widthAnimDuration + _opacityAnimDuration) / 2);

    setTimeout(() => {
        progressBar.style.opacity = '0';
        const setProgressZero = () => {
            setProgress(0);
            progressBar.removeEventListener('transitionend', setProgressZero);
        };
        progressBar.addEventListener('transitionend', setProgressZero);
    }, hideProgressDelay);
}
