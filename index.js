const express = require("express");
const { chromium } = require("playwright-chromium");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

var defaultOptions = {
  scale: 1,
  displayHeaderFooter: false,
  headerTemplate: "",
  footerTemplate: "",
  printBackground: false,
  landscape: false,
  pageRanges: "",
  format: "A4",
  width: "",
  height: "",
  margin: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  preferCSSPageSize: false,
  omitBackground: false,
  timeout: 30,
};

const app = express();
app.get("/", (req, res) => {
  // res.send("Information and stuff");
  res.send(defaultOptions);
});

app.get("/url", async (req, res) => {
  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("http://whatsmyuseragent.org/");
  // const result = await page.pdf();
  var result = await page.screenshot();
  await browser.close();
  res.end(Buffer.from(result, "binary"));
});

app.post("/url", async (req, res) => {
  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("http://whatsmyuseragent.org/");
  const result = await page.pdf();
  await browser.close();
  res.end(Buffer.from(result, "binary"));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
