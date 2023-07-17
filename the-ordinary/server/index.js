const express = require("express");
const path = require("path");
const scrape = require("./image-api");
const cors = require("cors");
const db = require("../db.json");

const root = path.resolve(process.cwd());

const server = express();

server.use(cors());

// Serve the "www/assets" directory
server.use('/assets', express.static(path.join(root, 'www', 'assets')));
server.use('/assets/css', express.static(path.join(root, 'www', 'assets')));
server.use('/catalog', express.static(path.join(root, 'www')));

// Serve the "www" directory for subroutes under "/catalog/"
server.get("/catalog/*", (req, res, next) => {
  console.log(req.params)
  const subroute = req.params[0];
  if (!subroute.startsWith("assets")) {
    express.static(path.join(root, 'www'))(req, res, next);
  } else {
    next();
  }
});

// API routes
server.get("/api/products", (req, res) => {
  res.json(db);
});

server.get("/api/image", async (req, res) => {
  const { q } = req.query;
  try {
    const urls = await scrape(q);
    res.json({
      error: false,
      response: urls,
    });
  } catch (e) {
    res.json({
      error: true,
      ...e,
      message: e.message,
      response: null,
    });
  }
});

// Send index.html for other routes
server.get(/^\/(?!api)(?!.*\.(?:html|js|css|ttf|otf|woff|woff2|json)).*$/, (req, res) => {
  console.log(req.path)
  res.sendFile(path.join(root, 'www', 'index.html'));
});


module.exports = {
  server
};
