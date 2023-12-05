---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-browser-security/postmessage-permissive-origin
  language: TypeScript
  severity: Warning
title: Specify origin in postMessage
---
## Metadata
**ID:** `typescript-browser-security/postmessage-permissive-origin`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

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
