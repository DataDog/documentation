---
aliases:
- /continuous_integration/static_analysis/rules/javascript-express/reduce-server-fingerprinting
- /static_analysis/rules/javascript-express/reduce-server-fingerprinting
dependencies: []
disable_edit: true
group_id: javascript-express
meta:
  category: Security
  id: javascript-express/reduce-server-fingerprinting
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Server fingerprinting misconfiguration
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-express/reduce-server-fingerprinting`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

**CWE**: [693](https://cwe.mitre.org/data/definitions/693.html)

## Description
Improve your overall server security by taking the step to reduce the likelihood of server fingerprinting the software being used on the server.

By default, Express.js sends the `X-Powered-By` response header banner which can be disabled with `app.disable('X-Powered-By')`.

If you're using `helmet`, you can use either of these methods too:
- `app.use(hidePoweredBy())`
- `app.use(helmet.hidePoweredBy())`

#### Learn More
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

## Non-Compliant Code Examples
```javascript
const app = express()

// express() is called but none of the following were detected afterwards
// app.disable('x-powered-by')
// app.use(hidePoweredBy())
// app.use(helmet.hidePoweredBy())
```

## Compliant Code Examples
```javascript
const app = express()

app.use(helmet.hidePoweredBy());

// rest of your config
```

```javascript
const app = express()

app.use(hidePoweredBy())

// rest of your config
```

```javascript
const app = express()

app.disable('x-powered-by')

// rest of your config
```
