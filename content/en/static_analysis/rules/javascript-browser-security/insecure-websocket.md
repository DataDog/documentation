---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-browser-security/insecure-websocket
  language: JavaScript
  severity: Warning
title: Websockets must use SSL connections
---
## Metadata
**ID:** `javascript-browser-security/insecure-websocket`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

## Description
Always use secure websocket communication. When using websocket, use addresses that are SSL-enabled.



## Non-Compliant Code Examples
```javascript
const client = new WebSocket('ws://app.domain.tld')
```

## Compliant Code Examples
```javascript
const client = new WebSocket('wss://app.domain.tld')
```
