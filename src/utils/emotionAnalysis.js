export const emotionKeywords = {
  syukur: ["alhamdulillah", "bersyukur", "nikmat", "bahagia", "senang", "terima kasih", "lega", "damai"],
  sedih: ["sedih", "susah", "berat", "menangis", "kecewa", "gagal", "hampa", "terpuruk"],
  gelisah: ["cemas", "khawatir", "takut", "bingung", "galau", "resah", "was-was", "ragu"],
  semangat: ["semangat", "yakin", "kuat", "mampu", "bisa", "optimis", "harapan", "tekad"],
  taubat: ["istighfar", "tobat", "menyesal", "maaf", "ampun", "dosa", "kembali", "berubah"],
  cinta: ["cinta", "sayang", "rindu", "kasih", "peduli", "ikhlas", "redha", "ridha"],
};

export function analyzeEmotionLocal(text) {
  if (!text) return { dominantEmotion: "netral", scores: {}, intensity: 0, allEmotions: [] };
  
  const lowerText = text.toLowerCase();
  const scores = {};

  Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
    scores[emotion] = keywords.reduce((count, keyword) => {
      const regex = new RegExp(keyword, "gi");
      return count + (lowerText.match(regex) || []).length;
    }, 0);
  });

  const totalWords = text.split(/\s+/).length || 1;
  const sortedEmotions = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  
  // If no emotions found
  if (sortedEmotions[0][1] === 0) {
    return { dominantEmotion: "netral", scores, intensity: 0, allEmotions: [] };
  }
  
  const dominantEmotion = sortedEmotions[0];

  return {
    dominantEmotion: dominantEmotion[0],
    scores,
    intensity: Math.min((dominantEmotion[1] / totalWords) * 100, 100),
    allEmotions: sortedEmotions
      .filter(([, v]) => v > 0)
      .map(([emotion, count]) => ({ emotion, count })),
  };
}

// Sistem nudge otomatis berdasarkan emosi
export function checkActionTrigger(emotionHistory) {
  if (!emotionHistory || emotionHistory.length === 0) return [];
  
  const recentEntries = emotionHistory.slice(-3); // 3 jurnal terakhir
  
  const positiveCount = recentEntries.filter(
    (e) => ["syukur", "semangat", "cinta"].includes(e.dominantEmotion)
  ).length;

  const negativeCount = recentEntries.filter(
    (e) => ["sedih", "gelisah"].includes(e.dominantEmotion)
  ).length;

  const triggers = [];

  // Trigger donasi saat emosi positif berturut-turut
  if (positiveCount >= 2) {
    triggers.push({
      type: "donation",
      title: "💝 Momen Berbagi!",
      message: "Alhamdulillah, kondisi batinmu sedang baik. Yuk salurkan kebaikan melalui sedekah!",
      action: "/zakat",
      priority: "high",
    });
  }

  // Trigger doa/dzikir saat emosi negatif
  if (negativeCount >= 2) {
    triggers.push({
      type: "spiritual",
      title: "🤲 Allah Bersamamu",
      message: "Sepertinya kamu sedang berat. Mari kita berdoa bersama dan temukan ketenangan.",
      action: "/doa",
      priority: "high",
    });
  }

  // Trigger istighfar saat taubat dominan
  if (recentEntries.some((e) => e.dominantEmotion === "taubat")) {
    triggers.push({
      type: "taubat",
      title: "🌙 Pintu Taubat Terbuka",
      message: "Ramadhan adalah waktu terbaik untuk kembali. Baca istighfar dan perbanyak amal.",
      action: "/tasbih",
      priority: "medium",
    });
  }

  return triggers;
}
