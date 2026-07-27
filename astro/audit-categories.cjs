const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

const base = process.argv[2] || ".";
const v1 = yaml.load(fs.readFileSync(path.join(base, "data/api/v1/full_spec.yaml"), "utf8"));
const v2 = yaml.load(fs.readFileSync(path.join(base, "data/api/v2/full_spec.yaml"), "utf8"));

const tagMap = new Map();
const overrides = { "case-management": "cases", "scorecards": "service-scorecards" };

function processTags(spec, version) {
  for (const tag of (spec.tags || [])) {
    const slug = tag.name.toLowerCase().replace(/\s+/g, "-");
    if (!tagMap.has(slug)) {
      tagMap.set(slug, { name: tag.name, slug, versions: new Set(), deprecated: false, opCount: 0, hasUnstable: false, hasDeprecated: false, methods: new Set(), v1Ops: 0, v2Ops: 0 });
    }
    tagMap.get(slug).versions.add(version);
    if (tag["x-deprecated"]) tagMap.get(slug).deprecated = true;
  }
  for (const [p, pathObj] of Object.entries(spec.paths || {})) {
    for (const [method, op] of Object.entries(pathObj)) {
      if (["get","post","put","patch","delete","head","options"].includes(method) && op.tags) {
        for (const tagName of op.tags) {
          const slug = tagName.toLowerCase().replace(/\s+/g, "-");
          if (tagMap.has(slug)) {
            const entry = tagMap.get(slug);
            entry.opCount++;
            if (version === "v1") entry.v1Ops++;
            if (version === "v2") entry.v2Ops++;
            entry.versions.add(version);
            entry.methods.add(method.toUpperCase());
            if (op.deprecated) entry.hasDeprecated = true;
            if (op["x-unstable"]) entry.hasUnstable = true;
          }
        }
      }
    }
  }
}

processTags(v1, "v1");
processTags(v2, "v2");

const sorted = [...tagMap.values()].sort((a, b) => a.name.localeCompare(b.name));

console.log("=== ALL API CATEGORY PAGES ===\n");
for (const t of sorted) {
  const finalSlug = overrides[t.slug] || t.slug;
  const flags = [];
  if (t.deprecated) flags.push("CATEGORY-DEPRECATED");
  if (t.hasDeprecated) flags.push("has-deprecated-ops");
  if (t.hasUnstable) flags.push("has-unstable-ops");
  const versionDetail = [];
  if (t.v1Ops > 0) versionDetail.push("v1:" + t.v1Ops);
  if (t.v2Ops > 0) versionDetail.push("v2:" + t.v2Ops);
  console.log("/api/latest/" + finalSlug + "/");
  console.log("  " + t.name + " | " + versionDetail.join(" + ") + " endpoints | methods: " + [...t.methods].join(",") + (flags.length ? " | " + flags.join(", ") : ""));
}
console.log("\nTotal categories: " + sorted.length);

// Now find specific deprecated and unstable ops for sampling
console.log("\n=== SAMPLE DEPRECATED OPERATIONS ===\n");
function findSpecialOps(spec, version) {
  const results = [];
  for (const [p, pathObj] of Object.entries(spec.paths || {})) {
    for (const [method, op] of Object.entries(pathObj)) {
      if (!["get","post","put","patch","delete","head","options"].includes(method)) continue;
      if (op.deprecated || op["x-unstable"]) {
        results.push({ id: op.operationId, method: method.toUpperCase(), path: p, version, deprecated: !!op.deprecated, unstable: !!op["x-unstable"], tag: (op.tags||[])[0] });
      }
    }
  }
  return results;
}

const special = [...findSpecialOps(v1, "v1"), ...findSpecialOps(v2, "v2")];
const deprecated = special.filter(s => s.deprecated);
const unstable = special.filter(s => s.unstable);

for (const s of deprecated.slice(0, 8)) {
  console.log("  " + s.version + " " + s.method + " " + s.path + " [" + s.tag + "]");
}
if (deprecated.length > 8) console.log("  ... and " + (deprecated.length - 8) + " more (total: " + deprecated.length + ")");

console.log("\n=== SAMPLE UNSTABLE/PREVIEW OPERATIONS ===\n");
for (const s of unstable.slice(0, 8)) {
  console.log("  " + s.version + " " + s.method + " " + s.path + " [" + s.tag + "]");
}
if (unstable.length > 8) console.log("  ... and " + (unstable.length - 8) + " more (total: " + unstable.length + ")");
