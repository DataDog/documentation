---
aliases:
- /continuous_integration/static_analysis/rules/typescript-node-security/avoid-crypto-sha1
- /static_analysis/rules/typescript-node-security/avoid-crypto-sha1
dependencies: []
disable_edit: true
group_id: typescript-node-security
meta:
  category: Security
  id: typescript-node-security/avoid-crypto-sha1
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid SHA1 security protocol
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-node-security/avoid-crypto-sha1`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

**CWE**: [328](https://cwe.mitre.org/data/definitions/328.html)

## Description
Use of insecure encryption or hashing protocols expose your application to vulnerabilities.

#### Learn More

 - [JS Crypto Library](https://cryptojs.gitbook.io/docs/#hmac)

## Non-Compliant Code Examples
```typescript
const hash = CryptoJS.HmacSHA1("Message", "Secret Passphrase");
const hash = CryptoJS.HmacSHA1("Message", "Secret Passphrase", anotherargument);
```
