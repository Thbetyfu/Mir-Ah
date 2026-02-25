import { NextResponse } from 'next/server';
import { MURABBI_SYSTEM_PROMPT } from '@/utils/murabbiPrompt';

export async function POST(request) {
    try {
        const { emotion, journalContent } = await request.json();

        if (!emotion || !journalContent) {
            return NextResponse.json({ error: 'Emotion and journal content are required' }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            // Dummy response if no API key is set
            return NextResponse.json({
                reply: `Saya memahami perasaanmu. Ingatlah firman Allah:
'Sesungguhnya sesudah kesulitan itu ada kemudahan' (QS. Al-Insyirah: 6)

Misi Akhlak Harian: Ambil wudhu, shalat 2 rakaat, dan curhatkan semuanya dalam sujud. Cobalah untuk membagikan senyuman atau sapaan kebaikan kepada 1 orang terdekat.

Semoga Allah memberikan ketenangan di hatimu. Aamiin.`
            }, { status: 200 });
        }

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [
                    { role: 'user', parts: [{ text: `Kondisi emosi: ${emotion}\nIsi jurnal: ${journalContent}` }] }
                ],
                systemInstruction: { parts: [{ text: MURABBI_SYSTEM_PROMPT }] }
            })
        });

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, Mir'ah AI sedang kesulitan memproses.";

        return NextResponse.json({ reply }, { status: 200 });
    } catch (error) {
        console.error('Murabbi API Error:', error);
        return NextResponse.json({ reply: 'Terjadi kesalahan sistem.' }, { status: 500 });
    }
}
