---
aliases:
- /continuous_integration/static_analysis/rules/typescript-browser-security/postmessage-permissive-origin
- /static_analysis/rules/typescript-browser-security/postmessage-permissive-origin
dependencies: []
disable_edit: true
group_id: typescript-browser-security
meta:
  category: Security
  id: typescript-browser-security/postmessage-permissive-origin
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Specify origin in postMessage
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-browser-security/postmessage-permissive-origin`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

**CWE**: [923](https://cwe.mitre.org/data/definitions/923.html)

## Description
Always specify the origin of the message for security reasons and to avoid spoofing attacks. Always specify an exact target origin, not `*`, when you use `postMessage` to send data to other windows.

#### Learn More

 - [window.postMessage documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)

## Non-Compliant Code Examples
```typescript
window.postMessage(message, '*')

```

## Compliant Code Examples
```typescript
window.postMessage(message, 'https://app.domain.tld')

```
