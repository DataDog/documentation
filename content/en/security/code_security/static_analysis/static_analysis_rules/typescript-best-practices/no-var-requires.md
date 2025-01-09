---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/no-var-requires
- /static_analysis/rules/typescript-best-practices/no-var-requires
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Best Practices
  id: typescript-best-practices/no-var-requires
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid require statements
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/no-var-requires`

**Language:** TypeScript

**Severity:** Warning

**Category:** Best Practices

## Description
Use ESM instead of CommonJS imports.

## Non-Compliant Code Examples
```typescript
var foo = require('foo');
const foo = require('foo');
let foo = require('foo');
let foo = trick(require('foo'));
var foo = require?.('foo');
const foo = require?.('foo');
let foo = require?.('foo');
let foo = trick(require?.('foo'));
let foo = trick?.(require('foo'));
const foo = require('./foo.json') as Foo;
const foo: Foo = require('./foo.json').default;

// const foo = <Foo>require('./foo.json');

// https://github.com/typescript-eslint/typescript-eslint/issues/3883
// const configValidator = new Validator(require('./a.json'));
// configValidator.addSchema(require('./a.json'));
```

## Compliant Code Examples
```typescript
import foo = require('foo');
require('foo');
require?.('foo');

```
