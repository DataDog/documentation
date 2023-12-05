---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-express/hardcoded-secret
  language: TypeScript
  severity: Warning
title: Avoid using a hard-coded secret
---
## Metadata
**ID:** `typescript-express/hardcoded-secret`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

## Description
Do not store secrets in plaintext where they are used. Instead use environment variables (`process.env.<NAME>`) or better yet, use a key management service (KMS) linked below that includes encryption.

#### Learn More
- [OWASP hardcoded passwords](https://owasp.org/www-community/vulnerabilities/Use_of_hard-coded_password)
- [Google Cloud Key Management Service](https://cloud.google.com/kms/docs)
- [AWS Key Management Service](https://aws.amazon.com/kms/)

## Non-Compliant Code Examples
```typescript
import session from "express-session"
import { expressjwt } from "express-jwt"

app.use(
  session({
    name: "session-name",
    secret: "not-secret-secret",
    secret: `${isProd ? "prod-secret" : "dev-secret"}`,
  })
)

app.use(
  expressjwt({
    name: "session-name",
    secret: "not-secret-secret",
    secret: `${isProd ? "prod-secret" : "dev-secret"}`,
  })
)
```

## Compliant Code Examples
```typescript
import session from "express-session"
import { expressjwt } from "express-jwt"

app.use(
  session({
    name: "session-name",
    secret: process.env.SECRET
  })
)

app.use(
  expressjwt({
    name: "session-name",
    secret: process.env.SECRET
  })
)
```
