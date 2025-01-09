---
aliases:
- /continuous_integration/static_analysis/rules/javascript-browser-security/insecure-websocket
- /static_analysis/rules/javascript-browser-security/insecure-websocket
dependencies: []
disable_edit: true
group_id: javascript-browser-security
meta:
  category: Security
  id: javascript-browser-security/insecure-websocket
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Websockets must use SSL connections
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-browser-security/insecure-websocket`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

**CWE**: [319](https://cwe.mitre.org/data/definitions/319.html)

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
