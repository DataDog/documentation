---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-node-security/avoid-crypto-rc4
  language: TypeScript
  severity: Warning
title: Avoid RC4
---
## Metadata
**ID:** `typescript-node-security/avoid-crypto-rc4`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

## Description
Use of the RC4 security protocol exposes your application to vulnerabilities.

#### Learn More

 - [JS Crypto Library, RC4](https://cryptojs.gitbook.io/docs/#ciphers)

## Non-Compliant Code Examples
```typescript
const encrypted = CryptoJS.RC4.encrypt("Message", "Secret Passphrase");
const decrypted = CryptoJS.RC4.decrypt(encrypted, "Secret Passphrase");
```
