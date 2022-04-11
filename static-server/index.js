var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

// config.js
var require_config = __commonJS({
  "config.js"(exports, module2) {
    module2.exports = {
      dev: {
        static: {
          port: 3001,
          url: "http://localhost:3001"
        },
        dash: {
          url: "http://localhost:3000"
        }
      },
      prod: {
        static: {
          port: 3001,
          url: "http://localhost:3001"
        },
        dash: {
          url: "http://localhost:3000"
        }
      }
    };
  }
});

// static-server/index.ts
var import_express = __toESM(require("../node_modules/express/index.js"));

// src/helpers/config.ts
var import_config = __toESM(require_config());
var config = process.env.NODE_ENV === "development" ? import_config.default.dev : import_config.default.prod;
var config_default = config;

// static-server/index.ts
var import_cors = __toESM(require("../node_modules/cors/lib/index.js"));
var import_cookie_parser = __toESM(require("../node_modules/cookie-parser/index.js"));
var import_middleware_async = require("../node_modules/middleware-async/index.js");

// static-server/helpers/serveFile.ts
var import_fs = require("fs");
var import_path = require("path");

// src/helpers/db.ts
var import_client = require("../node_modules/@prisma/client/index.js");
var prisma = global.prisma || new import_client.PrismaClient({
  log: process.env.NODE_ENV === "production" ? [] : ["query"]
});
if (process.env.NODE_ENV !== "production")
  global.prisma = prisma;

// static-server/helpers/serveFile.ts
var dirCache = {};
var fetchDir = async (id) => {
  if (!dirCache[id]) {
    const schema = await prisma.snapshot.findFirst({ where: { id } });
    dirCache[id] = schema ? new URL(schema.url).hostname : "/";
    setTimeout(() => delete dirCache[id], 60 * 1e3);
    return dirCache[id];
  } else
    return dirCache[id];
};
var check = (req) => req.cookies.archiveUUID;
var handle = async (req, res) => {
  const file = (0, import_path.join)(process.cwd(), "archive", req.cookies.archiveUUID, "files", await fetchDir(req.cookies.archiveUUID), req.path);
  if (!(0, import_fs.existsSync)(file))
    return res.status(404).send("404");
  res.sendFile(file);
  return;
};
var serveFile_default = { check, handle };

// static-server/helpers/serveExternal.ts
var import_fs2 = require("fs");
var import_path2 = require("path");
var check2 = (req) => {
  var _a;
  return req.path.startsWith("/ext/") && (req.headers.accept === "*/*" || ((_a = req.headers["user-agent"]) == null ? void 0 : _a.startsWith("node-fetch")));
};
var handle2 = (req, res) => {
  const file = (0, import_path2.join)(process.cwd(), "archive", req.path.slice(4));
  if (!(0, import_fs2.existsSync)(file))
    return res.status(500).send();
  res.sendFile(file);
};
var serveExternal_default = { check: check2, handle: handle2 };

// static-server/helpers/setupCookies.ts
var setupCookies = async (req, res) => {
  const snapshot = await prisma.snapshot.findFirst({
    where: {
      id: req.params.uuid
    }
  });
  if (!snapshot)
    return res.status(501).json({
      message: "Couldn't find snapshot"
    });
  const expires = new Date();
  expires.setDate(expires.getDate() + 1);
  res.cookie("archiveUUID", req.params.uuid, {
    path: "/",
    expires,
    httpOnly: true
  }).redirect(snapshot.path);
};
var setupCookies_default = setupCookies;

// static-server/index.ts
var app = (0, import_express.default)();
app.use((0, import_cors.default)({
  origin: config_default.dash.url
}));
app.use((0, import_cookie_parser.default)());
app.use(import_express.default.json());
app.get("/view/:uuid", setupCookies_default);
app.use((0, import_middleware_async.asyncMiddleware)(async (req, res, next) => {
  if (serveExternal_default.check(req))
    return serveExternal_default.handle(req, res);
  if (serveFile_default.check(req))
    return serveFile_default.handle(req, res);
  next();
}));
app.listen(config_default.static.port, () => console.log("Static server started"));
