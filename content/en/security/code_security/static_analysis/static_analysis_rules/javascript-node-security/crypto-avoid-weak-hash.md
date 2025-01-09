---
aliases:
- /continuous_integration/static_analysis/rules/javascript-node-security/crypto-avoid-weak-hash
- /static_analysis/rules/javascript-node-security/crypto-avoid-weak-hash
dependencies: []
disable_edit: true
group_id: javascript-node-security
meta:
  category: Security
  id: javascript-node-security/crypto-avoid-weak-hash
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Avoid weak hash algorithm from CryptoJS
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-node-security/crypto-avoid-weak-hash`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

**CWE**: [328](https://cwe.mitre.org/data/definitions/328.html)

## Description
Use of insecure hash functions like MD5 or SHA1 can expose your application to vulnerabilities.

#### Learn More

 - [JS Crypto Library](https://cryptojs.gitbook.io/docs/#hashing)

## Non-Compliant Code Examples
```javascript
var hash = CryptoJS.MD5("Message", "Secret Passphrase");
var hash = CryptoJS.SHA1("Message", "Secret Passphrase");
var hash = CryptoJS.HmacMD5("Message", "Secret Passphrase");
```
