---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-node-security/avoid-des
  language: JavaScript
  severity: Warning
title: Avoid DES and 3DES
---
## Metadata
**ID:** `javascript-node-security/avoid-des`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

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
