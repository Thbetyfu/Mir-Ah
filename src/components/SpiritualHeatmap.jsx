"use client";
import { useState, useEffect } from "react";

const EMOTION_COLORS = {
    syukur: "#4CAF50",
    semangat: "#2196F3",
    cinta: "#E91E63",
    taubat: "#9C27B0",
    gelisah: "#FF9800",
    sedih: "#607D8B",
    netral: "#BDBDBD",
};

export default function SpiritualHeatmap() {
    const [journalData, setJournalData] = useState([]);

    useEffect(() => {
        // Ambil dari localStorage
        const stored = JSON.parse(localStorage.getItem("mirah_journals") || "[]");
        setJournalData(stored);
    }, []);

    // Generate 30 hari Ramadhan
    const ramadhanDays = Array.from({ length: 30 }, (_, i) => {
        const day = i + 1;
        const entry = journalData.find((j) => j.day === day);
        return {
            day,
            emotion: entry?.dominantEmotion || "netral",
            intensity: entry?.intensity || 0,
            hasEntry: !!entry,
        };
    });

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4 text-amber-300">
                🗺️ Spiritual Heatmap Ramadhan
            </h2>
            <div className="grid grid-cols-6 gap-2">
                {ramadhanDays.map(({ day, emotion, intensity, hasEntry }) => (
                    <div
                        key={day}
                        className="relative aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all hover:scale-110 cursor-pointer"
                        style={{
                            backgroundColor: hasEntry
                                ? EMOTION_COLORS[emotion]
                                : "#2a2a2a",
                            opacity: hasEntry ? 0.4 + (intensity / 100) * 0.6 : 0.3,
                            boxShadow: hasEntry
                                ? `0 0 ${intensity / 5}px ${EMOTION_COLORS[emotion]}`
                                : "none",
                        }}
                        title={hasEntry ? `Hari ${day}: ${emotion} (${Math.round(intensity)}%)` : `Hari ${day}: Belum ada jurnal`}
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-2 mt-4">
                {Object.entries(EMOTION_COLORS).map(([emotion, color]) => (
                    <div key={emotion} className="flex items-center gap-1 text-xs">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: color }}
                        />
                        <span className="capitalize text-gray-300">{emotion}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
