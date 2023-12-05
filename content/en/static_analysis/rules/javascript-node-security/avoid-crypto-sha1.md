---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-node-security/avoid-crypto-sha1
  language: JavaScript
  severity: Warning
title: Avoid SHA1 security protocol
---
## Metadata
**ID:** `javascript-node-security/avoid-crypto-sha1`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

## Description
Use of insecure encryption or hashing protocols expose your application to vulnerabilities.

#### Learn More

 - [JS Crypto Library](https://cryptojs.gitbook.io/docs/#hmac)

## Non-Compliant Code Examples
```javascript
var hash = CryptoJS.HmacSHA1("Message", "Secret Passphrase");
var hash = CryptoJS.HmacSHA1("Message", "Secret Passphrase", anotherargument);
```
