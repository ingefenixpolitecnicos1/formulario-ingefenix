const express = require('express');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const cors = require('cors');
const path = require('path');

// Activar plugin de sigilo
puppeteer.use(StealthPlugin());

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de verificación
app.post('/verificar-computacion', async (req, res) => {
  const { usuario, clave } = req.body;

  console.log('📥 Datos recibidos del frontend:');
  console.log('Usuario:', usuario);
  console.log('Clave:', clave);

  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: '/opt/render/project/src/.cache/puppeteer/chrome/linux-138.0.7204.168/chrome-linux64/chrome',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });



    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");

    await page.goto('https://evaluaciones.unemi.edu.ec/my/', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    console.log("🟢 Página cargada:", await page.title());

    await page.waitForSelector('#username');
    await page.type('#username', usuario, { delay: 80 });

    await page.waitForSelector('#password');
    await page.type('#password', clave, { delay: 80 });

    await Promise.all([
      page.click('#loginbtn'),
      page.waitForNavigation({ waitUntil: 'networkidle2' })
    ]);

    console.log("📌 URL después del login:", page.url());

    const exito = !page.url().includes('login');
    await browser.close();
    res.json({ exito });

  } catch (err) {
    console.error('💥 Error:', err.message);
    res.status(500).json({ exito: false });
  }
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor INGEFENIX activo en el puerto ${PORT}`);
});
