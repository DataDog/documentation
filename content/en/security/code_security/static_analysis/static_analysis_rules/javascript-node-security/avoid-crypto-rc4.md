---
aliases:
- /continuous_integration/static_analysis/rules/javascript-node-security/avoid-crypto-rc4
- /static_analysis/rules/javascript-node-security/avoid-crypto-rc4
dependencies: []
disable_edit: true
group_id: javascript-node-security
meta:
  category: Security
  id: javascript-node-security/avoid-crypto-rc4
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Avoid RC4
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-node-security/avoid-crypto-rc4`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

**CWE**: [328](https://cwe.mitre.org/data/definitions/328.html)

## Description
Use of RC4 security protocol exposes your application to vulnerabilities.

#### Learn More

 - [JS Crypto Library, RC4](https://cryptojs.gitbook.io/docs/#ciphers)

## Non-Compliant Code Examples
```javascript
var encrypted = CryptoJS.RC4.encrypt("Message", "Secret Passphrase");
var decrypted = CryptoJS.RC4.decrypt(encrypted, "Secret Passphrase");
```
