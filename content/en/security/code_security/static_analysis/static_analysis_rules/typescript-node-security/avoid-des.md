---
aliases:
- /continuous_integration/static_analysis/rules/typescript-node-security/avoid-des
- /static_analysis/rules/typescript-node-security/avoid-des
dependencies: []
disable_edit: true
group_id: typescript-node-security
meta:
  category: Security
  id: typescript-node-security/avoid-des
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid DES and 3DES
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-node-security/avoid-des`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

**CWE**: [328](https://cwe.mitre.org/data/definitions/328.html)

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
