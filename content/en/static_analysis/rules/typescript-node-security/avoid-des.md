---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-node-security/avoid-des
  language: TypeScript
  severity: Warning
title: Avoid DES and 3DES
---
## Metadata
**ID:** `typescript-node-security/avoid-des`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

## Description
Use of insecure encryption or hashing protocols expose your application to vulnerabilities.

#### Learn More

 - [JS Crypto Library, DES and TripleDES](https://cryptojs.gitbook.io/docs/#ciphers)

## Non-Compliant Code Examples
```typescript
const encrypted = CryptoJS.DES.encrypt("Message", "Secret Passphrase");
const decrypted = CryptoJS.DES.decrypt(encrypted, "Secret Passphrase");
const encrypted = CryptoJS.TripleDES.encrypt("Message", "Secret Passphrase");
const decrypted = CryptoJS.TripleDES.decrypt(encrypted, "Secret Passphrase");
```
