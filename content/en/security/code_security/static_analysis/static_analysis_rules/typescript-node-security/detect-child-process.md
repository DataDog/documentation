---
aliases:
- /continuous_integration/static_analysis/rules/typescript-node-security/detect-child-process
- /static_analysis/rules/typescript-node-security/detect-child-process
dependencies: []
disable_edit: true
group_id: typescript-node-security
meta:
  category: Error Prone
  id: typescript-node-security/detect-child-process
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid instances of 'child_process' and non-literal 'exec()'
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-node-security/detect-child-process`

**Language:** TypeScript

**Severity:** Warning

**Category:** Error Prone

## Description
In Node.js, the "child_process" module provides capabilities to execute shell commands directly. While this might seem beneficial, it comes with significant security risks. If the input to this module isn't properly sanitized, it can pave the way for command injection attacks. In such attacks, malicious actors could introduce harmful commands, which, when executed, could compromise system integrity or lead to data breaches.

Additionally, using non-literal arguments with "exec()" presents another challenge. When arguments to "exec()" are dynamic or derived from untrusted sources, there's a risk that attackers could manipulate this input. This makes the system vulnerable to unauthorized actions, potentially causing significant damage. Therefore, for a more secure Node.js application, it's advised to tread cautiously with these features, employing rigorous input validation and considering safer alternatives.

## Non-Compliant Code Examples
```typescript
require('child_process')
require('node:child_process')
var child = require('child_process'); child.exec(com)
var nodeChild = require('node:child_process'); nodeChild.exec(com)
import childImport from 'child_process'; childImport.exec(com)
import nodeChildImport from 'node:child_process'; nodeChildImport.exec(com)

// not supported
// var child = sinon.stub(require('child_process')); child.exec.returns({});
// var child = sinon.stub(require('node:child_process')); child.exec.returns({});

function fn () {
    var result = child.exec(str);
}

function fn () {
    var result = childImport.exec(str);
}

function fn () {
    var result = nodeChildImport.exec(str);
}

require('child_process').exec(str)

function fn () {
    require('child_process').exec(str)
}

const {exec} = require('child_process');
exec(str)

const {exec: nodeExec} = require('node:child_process');
nodeExec(str)

import {exec as foo} from 'child_process'; 
foo(com);
```

## Compliant Code Examples
```typescript
child_process.exec('ls')

var {} = require('child_process');
var result = /hello/.exec(str);

var {} = require('node:child_process');
var result = /hello/.exec(str);

import {} from 'child_process';
var result = /hello/.exec(str);

import {} from 'node:child_process';
var result = /hello/.exec(str);

var { spawn } = require('child_process'); spawn(str);
var { spawn } = require('node:child_process'); spawn(str);
import { spawn } from 'child_process'; spawn(str);
import { spawn } from 'node:child_process'; spawn(str);

// import redeclare not covered
// var foo = require('child_process');
// function fn () {
//   var foo = /hello/;
//   var result = foo.exec(str);
// }

var child = require('child_process'); child.spawn(str)
var child = require('node:child_process'); child.spawn(str)
import child from 'child_process'; child.spawn(str)
import child from 'node:child_process'; child.spawn(str)

var foo = require('child_process');
function fn () {
  var result = foo.spawn(str);
}

require('child_process').spawn(str)

function fn () {
  require('child_process').spawn(str)
}

// constant assigment static analysis not covered
// var child_process = require('child_process');
// var FOO = 'ls';
// child_process.exec(FOO);

// import child_process from 'child_process';
// const FOO = 'ls';
// child_process.exec(FOO);
```
