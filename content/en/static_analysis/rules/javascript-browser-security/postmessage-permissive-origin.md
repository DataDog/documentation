---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-browser-security/postmessage-permissive-origin
  language: JavaScript
  severity: Warning
title: Specify origin in postMessage
---
## Metadata
**ID:** `javascript-browser-security/postmessage-permissive-origin`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

## Description
Always specify the origin of the message for security reasons and to avoid spoofing attacks. Always specify an exact target origin, not `*`, when you use `postMessage` to send data to other windows.

#### Learn More

 - [window.postMessage documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)

## Non-Compliant Code Examples
```javascript
window.postMessage(message, '*')

```

## Compliant Code Examples
```javascript
window.postMessage(message, 'https://app.domain.tld')

```
