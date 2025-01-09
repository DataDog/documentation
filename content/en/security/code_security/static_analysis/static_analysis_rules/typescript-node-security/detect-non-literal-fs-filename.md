---
aliases:
- /continuous_integration/static_analysis/rules/typescript-node-security/detect-non-literal-fs-filename
- /static_analysis/rules/typescript-node-security/detect-non-literal-fs-filename
dependencies: []
disable_edit: true
group_id: typescript-node-security
meta:
  category: Security
  id: typescript-node-security/detect-non-literal-fs-filename
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid variables in 'fs' calls filename argument
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-node-security/detect-non-literal-fs-filename`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

## Description
An attacker could manipulate the file system call argument leading to a path traversal attack where the attacker get access to files and directories within your server file system.

## Non-Compliant Code Examples
```typescript
/// requires
var something = require('fs');
var a = something.open(c);

var one = require('fs').readFile;
one(filename);
         
var one = require('node:fs').readFile;
one(filename);

var one = require('fs/promises').readFile;
one(filename);

var something = require('fs/promises');
something.readFile(filename);

var something = require('node:fs/promises');
something.readFile(filename);

var something = require('fs-extra');
something.readFile(filename);

var { readFile: something } = require('fs');
something(filename)

//// imports
import { readFile as something } from 'fs';
something(filename);

import { readFile as something } from 'node:fs';
something(filename);

import { readFile as something } from 'fs-extra';
something(filename);

import { readFile as something } from 'fs/promises'
something(filename)

import { readFile as something } from 'node:fs/promises'
something(filename)

import { readFile } from 'node:fs/promises'
something(readFile)

import * as something from 'fs';
something.readFile(filename);
import * as something from 'node:fs';
something.readFile(filename);

/// promises
var something = require('fs').promises;
something.readFile(filename)

var something = require('node:fs').promises;
something.readFile(filename)

var something = require('fs');
something.promises.readFile(filename)

var something = require('node:fs');
something.promises.readFile(filename)

var fs = require('fs');
fs.readFile(`template with ${filename}`);

// inline
function foo () {
  var fs = require('fs');
  fs.readFile(filename);
}

function foo () {
  var { readFile: something } = require('fs');
  something(filename);
}

var fs = require('fs');
function foo () {
  var { readFile: something } = fs.promises;
  something(filename);
}

import fs from 'fs';
import path from 'path';
const key = fs.readFileSync(path.resolve(__dirname, foo));
```

## Compliant Code Examples
```typescript
var fs = require('fs');
var a = fs.open('test')
         
var something = require('some');
var a = something.readFile(c);

var something = require('fs').readFile, readFile = require('foo').readFile;
readFile(c);


// TODO: allow path with constant arguments
import { promises as fsp } from 'fs';
import fs from 'fs';
import path from 'path';
// const index = await fsp.readFile(path.resolve(__dirname, './index.html'), 'utf-8');
// const key = fs.readFileSync(path.join(__dirname, './ssl.key'));
await fsp.writeFile(path.resolve(__dirname, './sitemap.xml'), sitemap);
  
import fs from 'fs';
import path from 'path';
const dirname = path.dirname(__filename)
// const key = fs.readFileSync(path.resolve(dirname, './index.html'));

import fs from 'fs';
// const key = fs.readFileSync(`${process.cwd()}/path/to/foo.json`);

import fs from 'fs';
import path from 'path';
import url from 'url';
// const dirname = path.dirname(url.fileURLToPath(import.meta.url));
// const html = fs.readFileSync(path.resolve(dirname, './index.html'), 'utf-8');

import fs from 'fs';
// const pkg = fs.readFileSync(require.resolve('eslint/package.json'), 'utf-8');
```
