---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-node-security/avoid-crypto-rc4
  language: JavaScript
  severity: Warning
title: Avoid RC4
---
## Metadata
**ID:** `javascript-node-security/avoid-crypto-rc4`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

## Description
Use of RC4 security protocol exposes your application to vulnerabilities.

#### Learn More

 - [JS Crypto Library, RC4](https://cryptojs.gitbook.io/docs/#ciphers)

## Non-Compliant Code Examples
```javascript
var encrypted = CryptoJS.RC4.encrypt("Message", "Secret Passphrase");
var decrypted = CryptoJS.RC4.decrypt(encrypted, "Secret Passphrase");
```
