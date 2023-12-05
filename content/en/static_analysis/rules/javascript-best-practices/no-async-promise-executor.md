---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: javascript-best-practices/no-async-promise-executor
  language: JavaScript
  severity: Error
title: Promise executor cannot be an async function
---
## Metadata
**ID:** `javascript-best-practices/no-async-promise-executor`

**Language:** JavaScript

**Severity:** Error

**Category:** Best Practices

## Description
An async Promise executor won't surface exceptions if it fails. If you are already awaiting results in the executor, the Promise itself might not be required; please review your implementation.

## Non-Compliant Code Examples
```javascript
new Promise(async function foo(resolve, reject) {})
new Promise(async (resolve, reject) => {})
```

## Compliant Code Examples
```javascript
new Promise((resolve, reject) => {})
new Promise((resolve, reject) => {}, async function unrelated() {})
new Foo(async (resolve, reject) => {})
```
