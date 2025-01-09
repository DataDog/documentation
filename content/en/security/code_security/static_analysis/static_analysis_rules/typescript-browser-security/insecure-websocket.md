---
aliases:
- /continuous_integration/static_analysis/rules/typescript-browser-security/insecure-websocket
- /static_analysis/rules/typescript-browser-security/insecure-websocket
dependencies: []
disable_edit: true
group_id: typescript-browser-security
meta:
  category: Security
  id: typescript-browser-security/insecure-websocket
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Websockets must use SSL connections
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-browser-security/insecure-websocket`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

**CWE**: [319](https://cwe.mitre.org/data/definitions/319.html)

## Description
Always use secure websocket communication. When using websocket, use addresses that are SSL-enabled.



## Non-Compliant Code Examples
```typescript
const client = new WebSocket('ws://app.domain.tld')
```

## Compliant Code Examples
```typescript
const client = new WebSocket('wss://app.domain.tld')
```
