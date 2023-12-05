---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-express/access-restriction
  language: TypeScript
  severity: Warning
title: Limit exposure to sensitive directories and files
---
## Metadata
**ID:** `typescript-express/access-restriction`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

## Description
Exposing a directory listing could present an attacker an opportunity to access source code or other sensitive data through a file structure exploit. Restricting access to non-sensitive directories and files is strongly suggested.

#### Learn More
- [Express Serve index middleware](https://expressjs.com/en/resources/middleware/serve-index.html)


## Non-Compliant Code Examples
```typescript
import express, { Express } from 'express';
import serveIndex from "serve-index";

const app: Express = express();

app.use(serveIndex())
```

## Compliant Code Examples
```typescript
import express, { Express } from 'express';
import serveIndex from "serve-index";

const app: Express = express();

app.use(serveIndex("/public"))
```
