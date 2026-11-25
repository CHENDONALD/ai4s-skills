#!/usr/bin/env node
// Sync "version" from .zcode-plugin/plugin.json into kimi.plugin.json.
// Run after every version bump: node <this-script>
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = JSON.parse(readFileSync(join(root, ".zcode-plugin", "plugin.json"), "utf8"));
const kimiPath = join(root, "kimi.plugin.json");
const kimi = JSON.parse(readFileSync(kimiPath, "utf8"));

if (kimi.version === src.version) {
  console.log(`kimi.plugin.json already at ${src.version}`);
  process.exit(0);
}
console.log(`kimi.plugin.json: ${kimi.version} -> ${src.version}`);
kimi.version = src.version;
writeFileSync(kimiPath, JSON.stringify(kimi, null, 2) + "\n");
