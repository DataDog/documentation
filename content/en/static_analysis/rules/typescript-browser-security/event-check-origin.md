---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-browser-security/event-check-origin
  language: TypeScript
  severity: Warning
title: Check origin of events
---
## Metadata
**ID:** `typescript-browser-security/event-check-origin`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

## Description
Not checking the rule origin can lead to XSS attacks. Always check the event origin.

#### Learn More

 - [XSS and CSS Cheat Sheet from OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

## Non-Compliant Code Examples
```typescript
window.addEventListener('message', (event: Event) => {
  processing();
})
```

## Compliant Code Examples
```typescript
window.addEventListener('message', (event: Event) => {
  if (event.origin != 'https://app.domain.tld') {
    throw new Error('invalid origin')
  }

  processing();
})
```
