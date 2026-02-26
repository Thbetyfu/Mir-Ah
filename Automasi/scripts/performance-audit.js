const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

/**
 * Script untuk menjalankan audit performa Lighthouse secara otomatis
 * pada lingkungan lokal (http://localhost:3000).
 */
(async () => {
    console.log('🚀 Memulai audit performa Lighthouse untuk MyRamadhan...');

    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = {
        logLevel: 'info',
        output: 'html',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        port: chrome.port,
    };

    const lighthouse = (await import('lighthouse')).default;
    const runnerResult = await lighthouse('http://localhost:3000', options);

    // Simpan laporan ke file HTML
    const reportHtml = runnerResult.report;
    fs.writeFileSync('report.html', reportHtml);

    // Tampilkan ringkasan skor di terminal
    console.log('\n✅ Audit selesai!');
    console.log('Laporan tersimpan di: Automasi/report.html');
    console.log('-------------------------------------------');
    console.log(`Performa:      ${runnerResult.lhr.categories.performance.score * 100}`);
    console.log(`Aksesibilitas: ${runnerResult.lhr.categories.accessibility.score * 100}`);
    console.log(`Best Practices: ${runnerResult.lhr.categories['best-practices'].score * 100}`);
    console.log(`SEO:           ${runnerResult.lhr.categories.seo.score * 100}`);
    console.log('-------------------------------------------');

    await chrome.kill();
})();
