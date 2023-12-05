---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-express/missing-helmet
  language: TypeScript
  severity: Warning
title: Express application should use Helmet
---
## Metadata
**ID:** `typescript-express/missing-helmet`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

## Description
Per [Express documentation](https://expressjs.com/en/advanced/best-practice-security.html#use-helmet): 

> [Helmet](https://helmetjs.github.io/) can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.

This rule will check whether you've set `app.use(helmet())` within the file that you've called `express()`

## Non-Compliant Code Examples
```typescript
import express, { Express, Request, Response } from 'express';

const app: Express = express();

// no `app.use(helmet())` helmet detected in the file

app.get("/foo", (req: Request, res: Response) => res.send("foo"));

app.listen(8000);
```

## Compliant Code Examples
```typescript
import express, { Express, Request, Response } from 'express';
import helmet from "helmet";

const app: Express = express();

app.use(helmet()); // helmet detected

app.get("/foo", (req: Request, res: Response) => res.send("foo"));

app.listen(8000);
```
