import { createSignal } from 'solid-js';

const [progress, setProgress] = createSignal(0);
let progressBar!: HTMLDivElement;
let timeout: NodeJS.Timeout;

export const useGlobalProgress = () => [startProgress, stopProgress] as const;
const _widthAnimDuration = 300;
const _opacityAnimDuration = 175;
let _inProgress = false;

export function GlobalProgress() {
    const bar = document.querySelectorAll('#ProgressBar');
    if (bar && bar.length > 1) {
        throw Error('Only one Global Progress bar can be on the page at a time.');
    }

    return (
        <div
            id="ProgressBar"
            ref={progressBar}
            class="fixed inset-x-0 top-0 opacity-0 transition-opacity"
            style={{
                'transition-duration': `${_opacityAnimDuration}ms`,
            }}
        >
            <div class="relative h-[3px] w-full rounded-2xl bg-black opacity-75">
                <div
                    class="transition-width absolute left-0 top-0 h-full bg-emerald-400"
                    style={{
                        width: `${progress()}%`,
                        'transition-duration': `${_widthAnimDuration}ms`,
                    }}
                ></div>
            </div>
        </div>
    );
}

function startProgress(delay = 400) {
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
                    Math.random() * Math.floor(25 - (progress() / 100) * 23.5),
                );
                return count + v;
            });
            startProgress(Math.floor(Math.random() * delay + 100));
        },
        progress() == 0 ? 0 : delay,
    );

    _inProgress = true;
}

function stopProgress() {
    if (!_inProgress) return;
    clearTimeout(timeout);
    _inProgress = false;
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
