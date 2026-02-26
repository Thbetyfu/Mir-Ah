const { test, expect } = require('@playwright/test');

test.describe('MyRamadhan Functional Use Cases', () => {

    test.beforeEach(async ({ page }) => {
        page.on('console', msg => {
            if (msg.type() === 'error') console.log(`BROWSER ERROR: "${msg.text()}"`);
        });
    });

    test('Dashboard loads correctly', async ({ page }) => {
        await page.goto('/');
        // Pastikan title aplikasi muncul
        await expect(page).toHaveTitle(/MyRamadhan/);
        // Cek apakah kartu Hero muncul
        const heroCard = page.locator('.bg-gradient-to-br');
        await expect(heroCard.first()).toBeVisible();
    });

    test('Itikaf Mode toggle works', async ({ page }) => {
        await page.goto('/');

        // Tunggu hingga hero card termuat (tidak lagi pulse)
        const heroCard = page.locator('.bg-gradient-to-br').first();
        await expect(heroCard).toBeVisible({ timeout: 15000 });

        const main = page.locator('main');
        const itikafBtnSelector = 'button[title="Mode Digital I\'tikaf"]';

        // Log status awal
        const initialStatus = await main.getAttribute('data-itikaf-active');
        console.log(`[TEST LOG] Status Awal: ${initialStatus}`);

        // Aktifkan Mode I'tikaf
        await page.click(itikafBtnSelector, { force: true });

        // Verifikasi Atribut data (lebih stabil dari class)
        await expect(main).toHaveAttribute('data-itikaf-active', 'true', { timeout: 15000 });
        console.log(`[TEST LOG] Status Aktif Berhasil`);

        // Verifikasi ToolGrid difilter (hanya Quran)
        const quranTool = page.locator('button').filter({ hasText: 'Al-Qur' }).first();
        await expect(quranTool).toBeVisible({ timeout: 10000 });

        // Matikan kembali
        await page.click(itikafBtnSelector, { force: true });
        await expect(main).toHaveAttribute('data-itikaf-active', 'false', { timeout: 15000 });
        console.log(`[TEST LOG] Status Non-Aktif Berhasil`);
    });

    test('Journal submission and moral mission trigger', async ({ page }) => {
        await page.goto('/jurnal/write/daily');

        // Isi konten jurnal
        await page.locator('textarea').fill('Hari ini saya belajar tentang sabar dan syukur dalam menghadapi ujian hidup.');
        await page.locator('input[placeholder*="judul"]').fill('Refleksi Hari Ini');

        // Klik simpan
        await page.click('button:has-text("Simpan Jurnal")');

        // Tunggu redirect ke dashboard
        await page.waitForURL('**/', { timeout: 20000 });

        // Cek apakah kartu Misi Akhlak muncul (tunggu pemuatan localforage)
        const moralMission = page.locator('h3:has-text("Misi Akhlak Harian")');
        await expect(moralMission).toBeVisible({ timeout: 15000 });
    });
});
