const express = require('express');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const cors = require('cors');
const path = require('path');

puppeteer.use(StealthPlugin());

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para verificación de credenciales de computación
app.post('/verificar-computacion', async (req, res) => {
  const { usuario, clave } = req.body;

  // 👇 Esto imprime en la consola del servidor
  console.log('📥 Datos recibidos del frontend:');
  console.log('Usuario:', usuario);
  console.log('Clave:', clave);

  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
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

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor INGEFENIX activo en el puerto ${PORT}`);
});
