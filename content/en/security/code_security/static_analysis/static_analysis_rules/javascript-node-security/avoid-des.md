---
aliases:
- /continuous_integration/static_analysis/rules/javascript-node-security/avoid-des
- /static_analysis/rules/javascript-node-security/avoid-des
dependencies: []
disable_edit: true
group_id: javascript-node-security
meta:
  category: Security
  id: javascript-node-security/avoid-des
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Avoid DES and 3DES
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-node-security/avoid-des`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

**CWE**: [328](https://cwe.mitre.org/data/definitions/328.html)

## Description
Use of insecure encryption or hashing protocols expose your application to vulnerabilities.

#### Learn More

 - [JS Crypto Library, DES and TripleDES](https://cryptojs.gitbook.io/docs/#ciphers)

## Non-Compliant Code Examples
```javascript
var encrypted = CryptoJS.DES.encrypt("Message", "Secret Passphrase");
var decrypted = CryptoJS.DES.decrypt(encrypted, "Secret Passphrase");
var encrypted = CryptoJS.TripleDES.encrypt("Message", "Secret Passphrase");
var decrypted = CryptoJS.TripleDES.decrypt(encrypted, "Secret Passphrase");
```
