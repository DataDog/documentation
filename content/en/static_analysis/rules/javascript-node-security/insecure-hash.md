---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-node-security/insecure-hash
  language: JavaScript
  severity: Warning
title: Do not use weak hash functions
---
## Metadata
**ID:** `javascript-node-security/insecure-hash`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

## Description
Do not use weak hash algorithms such as MD5 or SHA1.

#### Learn More

 - [CWE-328: Use of Weak Hash](https://cwe.mitre.org/data/definitions/328.html)

## Non-Compliant Code Examples
```javascript
crypto.createHash("md5")

createHash("md5")

crypto.createHash("sha1")
```

## Compliant Code Examples
```javascript
crypto.createHash("sha256")

```
