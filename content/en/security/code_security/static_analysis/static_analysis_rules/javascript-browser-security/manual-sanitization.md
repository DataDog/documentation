---
aliases:
- /continuous_integration/static_analysis/rules/javascript-browser-security/manual-sanitization
- /static_analysis/rules/javascript-browser-security/manual-sanitization
dependencies: []
disable_edit: true
group_id: javascript-browser-security
meta:
  category: Security
  id: javascript-browser-security/manual-sanitization
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Avoid manual sanitization of inputs
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-browser-security/manual-sanitization`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

**CWE**: [79](https://cwe.mitre.org/data/definitions/79.html)

## Description
Never sanitize HTML input manually. It can lead to vulnerabilities. Use dedicated modules such as `sanitize-html` to sanitize user inputs.

## Non-Compliant Code Examples
```javascript
const sanitizedInput = input
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');
const html = `<strong>${sanitizedInput}</strong>`;

const sanitizedInput2 = input
  .replaceAll('bla', '&lt;')
  .replaceAll('foo', '&gt;');

const sanitizedInput3 = input
  .replaceAll('<', '&lt')
  .replaceAll('>', 'gt;');
```

## Compliant Code Examples
```javascript
import sanitizeHtml from 'sanitize-html';

const html = sanitizeHtml(`<strong>${input}</strong>`);
```
