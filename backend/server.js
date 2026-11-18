const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const port = process.env.PORT || 3000;
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg"
};

function sendJson(response, status, value) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(value));
}

const server = http.createServer((request, response) => {
  if (request.method === "GET" && request.url === "/api/catalogo") {
    fs.readFile(path.join(root, "data", "catalogo.json"), "utf8", (error, content) => {
      if (error) return sendJson(response, 500, { error: "No fue posible cargar el catálogo." });
      sendJson(response, 200, JSON.parse(content));
    });
    return;
  }

  if (request.method === "POST" && request.url === "/api/contacto") {
    let body = "";
    request.on("data", chunk => { body += chunk; if (body.length > 10000) request.destroy(); });
    request.on("end", () => {
      try {
        const data = JSON.parse(body);
        if (!data.nombre || !data.email || !data.mensaje) {
          return sendJson(response, 400, { error: "Nombre, correo y mensaje son obligatorios." });
        }
        sendJson(response, 201, { ok: true, message: "Consulta recibida correctamente." });
      } catch {
        sendJson(response, 400, { error: "JSON inválido." });
      }
    });
    return;
  }

  const pathname = decodeURIComponent(request.url.split("?")[0]);
  const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const filePath = path.resolve(root, relative);
  if (!filePath.startsWith(root + path.sep)) {
    response.writeHead(403);
    return response.end("Acceso denegado");
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Página no encontrada");
      return;
    }
    response.writeHead(200, { "Content-Type": mime[path.extname(filePath)] || "application/octet-stream" });
    response.end(content);
  });
});

server.listen(port, () => console.log(`CyberGuard disponible en http://localhost:${port}`));
