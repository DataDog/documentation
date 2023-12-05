---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-browser-security/insecure-websocket
  language: TypeScript
  severity: Warning
title: Websockets must use SSL connections
---
## Metadata
**ID:** `typescript-browser-security/insecure-websocket`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

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
