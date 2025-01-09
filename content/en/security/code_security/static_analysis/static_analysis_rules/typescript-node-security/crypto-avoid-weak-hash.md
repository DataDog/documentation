---
aliases:
- /continuous_integration/static_analysis/rules/typescript-node-security/crypto-avoid-weak-hash
- /static_analysis/rules/typescript-node-security/crypto-avoid-weak-hash
dependencies: []
disable_edit: true
group_id: typescript-node-security
meta:
  category: Security
  id: typescript-node-security/crypto-avoid-weak-hash
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid weak hash algorithm from CryptoJS
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-node-security/crypto-avoid-weak-hash`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

**CWE**: [328](https://cwe.mitre.org/data/definitions/328.html)

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
