---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-node-security/avoid-crypto-sha1
  language: TypeScript
  severity: Warning
title: Avoid SHA1 security protocol
---
## Metadata
**ID:** `typescript-node-security/avoid-crypto-sha1`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

## Description
Use of insecure encryption or hashing protocols expose your application to vulnerabilities.

#### Learn More

 - [JS Crypto Library](https://cryptojs.gitbook.io/docs/#hmac)

## Non-Compliant Code Examples
```typescript
const hash = CryptoJS.HmacSHA1("Message", "Secret Passphrase");
const hash = CryptoJS.HmacSHA1("Message", "Secret Passphrase", anotherargument);
```
