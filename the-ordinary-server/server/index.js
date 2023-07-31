import express from "express";
import path from "node:path";
import scrapeImagesFromGoogle from "./image-api.js";
import cors from "cors";
import db from "../db.json" assert { type: "json" };

const root = path.resolve(process.cwd());

const server = express();

server.use(cors());

// Serve the "www/assets" directory
server.use('/assets', express.static(path.join(root, 'ww3', 'assets')));
server.use('/assets/css', express.static(path.join(root, 'ww3', 'assets')));
server.use('/catalog', express.static(path.join(root, 'ww3')));

// Serve the "www" directory for subroutes under "/catalog/"
server.get("/catalog/*", (req, res, next) => {
  const subroute = req.params[0];
  if (!subroute.startsWith("assets")) {
    express.static(path.join(root, 'ww3'))(req, res, next);
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
    const urls = await scrapeImagesFromGoogle(q);
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
  
  res.sendFile(path.join(root, 'ww3', 'index.html'));
});

export {
  server
};
