---
aliases:
- /continuous_integration/static_analysis/rules/typescript-node-security/log-sensitive-data
- /static_analysis/rules/typescript-node-security/log-sensitive-data
dependencies: []
disable_edit: true
group_id: typescript-node-security
meta:
  category: Security
  id: typescript-node-security/log-sensitive-data
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid logging sensitive data
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-node-security/log-sensitive-data`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

**CWE**: [532](https://cwe.mitre.org/data/definitions/532.html)

## Description
Do not log sensitive data such as user id, email or other personal data (first name, last name, etc).

## Non-Compliant Code Examples
```typescript
console.log("email from user" + user.email);
console.log(`email from user ${user.email}`);
logger.info(`email from user ${user.email}`);
logger.info(`email from user ${user.name}: ${user.email}`);
logger.info(`email from user ${username}: ${user.email}`);
logger.warn(email);
logger.error(`email from user ${email}`);

foobar.error(`email from user ${email}`);

logger.foobar(`email from user ${email}`);

```

## Compliant Code Examples
```typescript
console.log("email from user" + user.id);
console.log(`email from user ${user.uuid}`);
```
