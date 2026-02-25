'use client';

import { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import localforage from 'localforage';
import { StorageService } from '@/lib/storageService';

const MoralMissionCard = () => {
    const [mission, setMission] = useState(null);

    useEffect(() => {
        const fetchMission = async () => {
            try {
                const stored = await localforage.getItem('daily_moral_mission');
                if (stored && stored.date === new Date().toISOString().split('T')[0]) {
                    setMission(stored);
                }
            } catch (err) {
                console.error("Gagal memuat misi akhlak", err);
            }
        };
        fetchMission();
    }, []);

    const handleComplete = async () => {
        try {
            if (mission.completed) return;

            const newMission = { ...mission, completed: true };
            await localforage.setItem('daily_moral_mission', newMission);
            setMission(newMission);

            // Tambahkan poin
            await StorageService.saveMoralProgress(newMission);

            alert("Alhamdulillah! 10 Poin Spiritual ditambahkan.");
        } catch (err) {
            console.error(err);
        }
    };

    if (!mission) return null;

    return (
        <div className='bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 p-5 rounded-3xl border border-amber-200/50 dark:border-amber-700/50 relative overflow-hidden group shadow-sm'>
            <div className='flex items-center gap-2 mb-3'>
                <div className='w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center shrink-0'>
                    <Sparkles size={16} className='text-amber-600 dark:text-amber-300' />
                </div>
                <h3 className='font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider text-xs'>
                    Misi Akhlak Harian
                </h3>
            </div>
            <p className='text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed whitespace-pre-wrap'>
                {mission.text}
            </p>

            <button
                onClick={handleComplete}
                disabled={mission.completed}
                className={`mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${mission.completed
                        ? 'bg-emerald-500 text-white shadow-lg'
                        : 'bg-amber-500 hover:bg-amber-600 text-white shadow-md hover:shadow-lg'
                    }`}
            >
                <CheckCircle2 size={16} />
                {mission.completed ? 'Selesai Dilakukan (10 Poin)' : 'Misi Selesai Dilakukan'}
            </button>
        </div >
    );
};

export default MoralMissionCard;
