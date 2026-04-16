/* PharmaDroid — Build Script */

const fs = require("fs");
const path = require("path");

const FILES = [
  "js/config.js",
  "js/i18n.js",
  "js/data/meds.js",
  "js/data/pharmacies.js",
  "js/data/interactions.js",
  "js/storage.js",
  "js/order.js",
  "js/delivery.js",
  "js/verification.js",
  "js/reminders.js",
  "js/scanner.js",
  "js/components.js",
  "js/screens-main.js",
  "js/screens-order.js",
  "js/screens-user.js",
  "js/screens-driver.js",
  "js/app.js",
  "js/main.js",
];

let bundle = "/* PharmaDroid — Bundled " + new Date().toISOString() + " */\n\n";

FILES.forEach(function(f) {
  const p = path.join(__dirname, f);
  if (!fs.existsSync(p)) {
    console.warn("[build] Missing:", f);
    return;
  }
  bundle += "\n/* ══════ " + f + " ══════ */\n";
  bundle += fs.readFileSync(p, "utf8");
  bundle += "\n";
});

fs.writeFileSync(path.join(__dirname, "bundle.js"), bundle);
console.log("[build] Wrote bundle.js (" + (bundle.length / 1024).toFixed(1) + " KB, " + FILES.length + " files)");
