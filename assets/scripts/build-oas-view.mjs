// assets/scripts/build-oas-view.mjs
// Usage: node assets/scripts/build-oas-view.mjs assets/api/v1/full_spec.yaml assets/api/v1/view.json
// prebuild that selectively resolves $ref (no strict validation)
// It resolves only what Hugo needs (e.g., the subset under components.schemas, parameters, requestBodies), with a depth cap and cycle guard, so you don’t inline the whole world.
import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

const inPath = process.argv[2];
const outPath = process.argv[3];
if (!inPath || !outPath) {
  console.error("usage: node build-oas-view.mjs <in.yaml> <out.json>");
  process.exit(2);
}

const raw = fs.readFileSync(inPath, "utf8");
const doc = YAML.parse(raw, { prettyErrors: true });

// Safe get by JSON pointer (local only)
function getByPointer(root, ref) {
  if (!ref.startsWith("#/")) return null;
  const parts = ref.slice(2).split("/").map(s => s.replace(/~1/g, "/").replace(/~0/g, "~"));
  let cur = root;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in cur) cur = cur[p];
    else return null;
  }
  return cur;
}

// Deep clone small objects only
const isPlain = v => v && typeof v === "object" && !Array.isArray(v);
function shallowClone(obj) {
  if (!isPlain(obj)) return obj;
  const out = {};
  for (const [k, v] of Object.entries(obj)) out[k] = v;
  return out;
}

// Resolve a schema/parameter/header/requestBody **partially** with depth & cycle guards
function makeResolver(root, { maxDepth = 6 } = {}) {
  const seen = new Set(); // guards cycles on exact ref strings

  function resolveAny(node, depth) {
    if (depth <= 0 || node == null) return node;

    if (Array.isArray(node)) return node.map(n => resolveAny(n, depth));

    if (!isPlain(node)) return node;

    // `$ref` handling (local only)
    if (typeof node.$ref === "string") {
      const ref = node.$ref;
      if (!ref.startsWith("#/")) return node; // leave external as-is
      if (seen.has(ref)) return node;         // cycle guard: keep $ref
      const target = getByPointer(root, ref);
      if (!target || !isPlain(target)) return node;

      seen.add(ref);
      const merged = { ...shallowClone(target) };
      // Keep original $ref for traceability if helpful
      merged.__refPath = ref;
      const out = resolveAny(merged, depth - 1);
      seen.delete(ref);
      return out;
    }

    // Regular object: walk selected known schema/MT structure keys
    const out = {};
    for (const [k, v] of Object.entries(node)) {
      if (k === "example") { out[k] = v; continue; } // leave heavy fields as-is
      out[k] = resolveAny(v, depth - 1);
    }
    return out;
  }
  return resolveAny;
}

function pick(obj, keys) {
  const o = {};
  for (const k of keys) if (obj && Object.hasOwn(obj, k)) o[k] = obj[k];
  return o;
}

const resolve = makeResolver(doc, { maxDepth: 8 });

// Build a compact view
const view = { schemas: {}, parameters: {}, requestBodies: {}, headers: {} };

// Schemas
const schemas = doc?.components?.schemas || {};
for (const [name, schema] of Object.entries(schemas)) {
  // Partially resolve but keep a manageable shape
  const resolved = resolve(schema, 8);
  // Optionally prune to what Hugo needs most (type/properties/required/enum/oneOf/allOf/items/format/description)
  const minimal = pick(resolved, ["type","properties","required","enum","oneOf","allOf","anyOf","items","format","description","__refPath"]);
  view.schemas[name] = minimal ?? resolved ?? schema;
}

// Parameters
const params = doc?.components?.parameters || {};
for (const [name, p] of Object.entries(params)) {
  const resolved = resolve(p, 5);
  view.parameters[name] = pick(resolved, ["name","in","required","schema","description","__refPath"]);
}

// RequestBodies
const rbs = doc?.components?.requestBodies || {};
for (const [name, rb] of Object.entries(rbs)) {
  const resolved = resolve(rb, 5);
  view.requestBodies[name] = pick(resolved, ["description","required","content","__refPath"]);
}

// Headers (optional)
const headers = doc?.components?.headers || {};
for (const [name, h] of Object.entries(headers)) {
  const resolved = resolve(h, 5);
  view.headers[name] = pick(resolved, ["description","required","schema","__refPath"]);
}

// Tag it so your Hugo partial knows it’s preprocessed
view["x-hugo-preprocessed"] = true;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(view));
console.error(`Wrote ${outPath} (schemas=${Object.keys(view.schemas).length})`);
