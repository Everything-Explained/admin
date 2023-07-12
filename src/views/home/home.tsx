import { useNavigate } from '@solidjs/router';
import { JointButtons } from '../../components/ui/joint-buttons';
import { useGlobalProcess } from '../../components/ui/global-progress';

export function Home() {
    const nav = useNavigate();
    const [startProgress, stopProgress] = useGlobalProcess();

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
