'use client';

import { useEffect, useState } from 'react';
import useAppMode from '@/hooks/useAppMode';
import NotificationDrawer from '@/components/NotificationDrawer';

export default function ItikafTimer() {
    const { isItikafMode, toggleItikafMode } = useAppMode();
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        let timer;
        if (isItikafMode) {
            // Set timer untuk 30 menit (30 * 60 * 1000 ms)
            timer = setTimeout(() => {
                setShowWarning(true);
            }, 30 * 60 * 1000); // 30 mins
        }

        return () => {
            if (timer) clearTimeout(timer);
            setShowWarning(false);
        };
    }, [isItikafMode]);

    return (
        <NotificationDrawer
            isOpen={showWarning}
            onClose={() => setShowWarning(false)}
            notifications={[
                {
                    id: 'itikaf-warning',
                    title: "Waktunya Meletakkan Ponsel",
                    message: "Kamu sudah 30 menit menggunakan aplikasi dalam mode I'tikaf. Matikan layar dan kembalilah berkontemplasi secara langsung.",
                    type: "itikaf",
                    time: new Date().toLocaleTimeString(),
                }
            ]}
        />
    );
}
