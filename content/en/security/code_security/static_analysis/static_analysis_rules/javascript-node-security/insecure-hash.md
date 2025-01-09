---
aliases:
- /continuous_integration/static_analysis/rules/javascript-node-security/insecure-hash
- /static_analysis/rules/javascript-node-security/insecure-hash
dependencies: []
disable_edit: true
group_id: javascript-node-security
meta:
  category: Security
  id: javascript-node-security/insecure-hash
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Do not use weak hash functions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-node-security/insecure-hash`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

**CWE**: [328](https://cwe.mitre.org/data/definitions/328.html)

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
