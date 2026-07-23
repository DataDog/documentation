// Validate Claude's review JSON against `.github/schemas/create-review.json`
// using Ajv. The workflow runs `npm install ajv` before invoking github-
// script so this module can `require("ajv")` via standard Node resolution
// (walks up to $GITHUB_WORKSPACE/node_modules).

"use strict";

const fs = require("node:fs");
const path = require("node:path");
const Ajv = require("ajv");

const SCHEMA_PATH = path.join(__dirname, "..", "schemas", "create-review.json");
const SCHEMA = JSON.parse(fs.readFileSync(SCHEMA_PATH, "utf8"));

// strictRequired: false — Ajv's default strict mode complains when
// `required` appears inside `anyOf`/`oneOf` without redeclaring the
// `properties` block at that level. Our schema uses
// `anyOf: [{required:[line]},{required:[position]}]` to enforce
// GitHub's "inline comments need coordinates" runtime rule without
// duplicating the property declarations.
const ajv = new Ajv({ allErrors: false, strict: true, strictRequired: false });
const ajvValidate = ajv.compile(SCHEMA);

function validate(obj) {
  if (ajvValidate(obj)) return null;
  const e = ajvValidate.errors?.[0] ?? {};
  const where = e.instancePath || "$";
  return `${where} ${e.message || "invalid"}`.trim();
}

module.exports = { validate, SCHEMA };
