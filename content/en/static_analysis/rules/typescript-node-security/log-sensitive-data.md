---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-node-security/log-sensitive-data
  language: TypeScript
  severity: Warning
title: Avoid logging sensitive data
---
## Metadata
**ID:** `typescript-node-security/log-sensitive-data`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

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
