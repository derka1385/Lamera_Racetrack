import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { join, normalize } from "node:path";

const root = join(process.cwd(), "out");
const basePath = "/Lamera_Racetrack";
const port = Number(process.env.PORT ?? 4173);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

function extension(pathname) {
  const match = pathname.match(/\.[a-z0-9]+$/i);
  return match?.[0] ?? ".html";
}

function resolveFile(url) {
  const requestUrl = new URL(url, `http://127.0.0.1:${port}`);
  let pathname = decodeURIComponent(requestUrl.pathname);

  if (pathname === basePath) pathname = `${basePath}/`;
  if (pathname.startsWith(`${basePath}/`)) pathname = pathname.slice(basePath.length);
  if (!pathname || pathname === "/") pathname = "/index.html";
  if (pathname.endsWith("/")) pathname = `${pathname}index.html`;

  const candidate = normalize(join(root, pathname));
  if (!candidate.startsWith(root)) return null;
  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;

  const htmlCandidate = normalize(join(root, `${pathname}.html`));
  if (htmlCandidate.startsWith(root) && existsSync(htmlCandidate)) return htmlCandidate;

  return null;
}

createServer((request, response) => {
  const file = resolveFile(request.url ?? "/");

  if (!file) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "Content-Type": mimeTypes[extension(file)] ?? "application/octet-stream",
    "Cache-Control": "no-store",
  });
  createReadStream(file).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`Serving ${root} at http://127.0.0.1:${port}${basePath}/`);
});
