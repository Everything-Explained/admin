import { Route, Routes, useNavigate } from '@solidjs/router';
import { JointButtons } from '../../components/ui/joint-buttons';
import { ArticlePanel } from '../../components/article-panel';
import { useProgress } from '../../components/ui/global-progress';
import { createSignal, onCleanup } from 'solid-js';

export function Home() {
    const nav = useNavigate();
    const [startProgress, stopProgress] = useProgress();

    return (
        <div class="hero relative top-[10vh] max-w-lg m-auto rounded-lg bg-base-200">
            <div class="text-center hero-content">
                <div class="max-w-md">
                    <h1 class="text-5xl font-bold">Admin Panel</h1>
                    <p class="py-6 text-xl">Please select a destination below!</p>
                    <JointButtons
                        color="primary"
                        size="md"
                        clickHandlers={[
                            () => nav('/literature'),
                            () => {
                                startProgress();
                            },
                            () => {
                                stopProgress();
                            },
                        ]}
                        names={['Literature', 'Logs', 'Users']}
                        toolTips={[
                            null,
                            { text: 'Not Implemented', color: 'warning' },
                            { text: 'Not Implemented', color: 'warning' },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
