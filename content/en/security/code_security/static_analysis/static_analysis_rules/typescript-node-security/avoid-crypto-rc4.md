---
aliases:
- /code_analysis/static_analysis_rules/typescript-node-security/avoid-crypto-rc4
- /continuous_integration/static_analysis/rules/typescript-node-security/avoid-crypto-rc4
- /static_analysis/rules/typescript-node-security/avoid-crypto-rc4
dependencies: []
disable_edit: true
group_id: typescript-node-security
meta:
  category: Security
  id: typescript-node-security/avoid-crypto-rc4
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid RC4
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-node-security/avoid-crypto-rc4`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

**CWE**: [328](https://cwe.mitre.org/data/definitions/328.html)

## Description
Use of the RC4 security protocol exposes your application to vulnerabilities.

#### Learn More

 - [JS Crypto Library, RC4](https://cryptojs.gitbook.io/docs/#ciphers)

## Non-Compliant Code Examples
```typescript
const encrypted = CryptoJS.RC4.encrypt("Message", "Secret Passphrase");
const decrypted = CryptoJS.RC4.decrypt(encrypted, "Secret Passphrase");
```
