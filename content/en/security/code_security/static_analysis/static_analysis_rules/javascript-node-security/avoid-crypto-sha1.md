---
aliases:
- /continuous_integration/static_analysis/rules/javascript-node-security/avoid-crypto-sha1
- /static_analysis/rules/javascript-node-security/avoid-crypto-sha1
dependencies: []
disable_edit: true
group_id: javascript-node-security
meta:
  category: Security
  id: javascript-node-security/avoid-crypto-sha1
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Avoid SHA1 security protocol
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-node-security/avoid-crypto-sha1`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

**CWE**: [328](https://cwe.mitre.org/data/definitions/328.html)

## Description
Use of insecure encryption or hashing protocols expose your application to vulnerabilities.

#### Learn More

 - [JS Crypto Library](https://cryptojs.gitbook.io/docs/#hmac)

## Non-Compliant Code Examples
```javascript
var hash = CryptoJS.HmacSHA1("Message", "Secret Passphrase");
var hash = CryptoJS.HmacSHA1("Message", "Secret Passphrase", anotherargument);
```
