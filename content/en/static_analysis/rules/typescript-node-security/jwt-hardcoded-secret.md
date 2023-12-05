---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-node-security/jwt-hardcoded-secret
  language: TypeScript
  severity: Error
title: Do not use hardcoded secret with a JWT
---
## Metadata
**ID:** `typescript-node-security/jwt-hardcoded-secret`

**Language:** TypeScript

**Severity:** Error

**Category:** Security

## Description
Never hardcode secrets. Instead, use secrets from environment variables or a secret vault.

## Non-Compliant Code Examples
```typescript
import jwt from "jsonwebtoken";

const token = jwt.sign({ foo: "bar" }, "secret");

const token = jwt.sign({ foo: "bar" }, 'secret');

const token = jwt.sign({ foo: "bar" }, `secret`);
```

## Compliant Code Examples
```typescript
import jwt from "jsonwebtoken";

const token = jwt.sign({ foo: "bar" }, process.env.JWT_SECRET);
```
