const express = require("express");
const { chromium } = require("playwright-chromium");

// Constants
const PORT = 3000;
const HOST = "0.0.0.0";

// App
const app = express();
app.get("/", (req, res) => {
  (async () => {
    const browser = await chromium.launch({
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
      // 💡 This enables logs for the communication between Playwright and Chromium
      // logger: {
      //   isEnabled: (name, severity) => name === "browser" || "context",
      //   log: (name, severity, message, args) => console.log(`${name} ${message}`),
      // },
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("http://whatsmyuseragent.org/");
    await page.screenshot({ path: `src/example-chromium.png` });
    await browser.close();
  })();
  res.send("Hello World");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
