import { PDFOptions, UrlBody, HtmlBody } from "./types";
import Fastify, { FastifyInstance } from "fastify";
const server: FastifyInstance = Fastify({});
import { chromium } from "playwright-chromium";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

var defaultOptions: PDFOptions = {
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

server.get("/", async (request, reply) => {
  return defaultOptions;
});

server.post<{ Body: UrlBody }>("/url", async (request, reply) => {
  const options = Object.assign(defaultOptions, request.body.options);
  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(request.body.url);
  const result = await page.pdf(options);
  await browser.close();
  reply.type("application/pdf");
  reply.send(result);
});

server.post<{ Body: HtmlBody }>("/html", async (request, reply) => {
  const options = Object.assign(defaultOptions, request.body.options);
  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setContent(request.body.html);
  const result = await page.pdf(options);
  await browser.close();
  reply.type("application/pdf");
  reply.send(result);
});

const start = async () => {
  try {
    await server.listen(PORT, HOST);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
