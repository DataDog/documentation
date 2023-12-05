---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-node-security/crypto-avoid-weak-hash
  language: JavaScript
  severity: Warning
title: Avoid weak hash algorithm from CryptoJS
---
## Metadata
**ID:** `javascript-node-security/crypto-avoid-weak-hash`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

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
