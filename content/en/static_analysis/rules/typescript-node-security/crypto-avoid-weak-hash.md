---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-node-security/crypto-avoid-weak-hash
  language: TypeScript
  severity: Warning
title: Avoid weak hash algorithm from CryptoJS
---
## Metadata
**ID:** `typescript-node-security/crypto-avoid-weak-hash`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

## Description
Use of insecure hash functions like MD5 or SHA1 can expose your application to vulnerabilities.

#### Learn More

 - [JS Crypto Library](https://cryptojs.gitbook.io/docs/#hashing)

## Non-Compliant Code Examples
```typescript
const hash = CryptoJS.MD5("Message", "Secret Passphrase");
const hash = CryptoJS.SHA1("Message", "Secret Passphrase");
const hash = CryptoJS.HmacMD5("Message", "Secret Passphrase");
```
