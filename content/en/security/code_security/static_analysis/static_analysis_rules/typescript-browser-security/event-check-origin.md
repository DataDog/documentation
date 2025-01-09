---
aliases:
- /continuous_integration/static_analysis/rules/typescript-browser-security/event-check-origin
- /static_analysis/rules/typescript-browser-security/event-check-origin
dependencies: []
disable_edit: true
group_id: typescript-browser-security
meta:
  category: Security
  id: typescript-browser-security/event-check-origin
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Check origin of events
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-browser-security/event-check-origin`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

**CWE**: [346](https://cwe.mitre.org/data/definitions/346.html)

## Description
Not checking the rule origin can lead to XSS attacks. Always check the event origin.

#### Learn More

 - [XSS and CSS Cheat Sheet from OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

## Non-Compliant Code Examples
```typescript
window.addEventListener('message', (event: MessageEvent) => {
  processing();
})
```

## Compliant Code Examples
```typescript
window.addEventListener('message', (event: MessageEvent) => {
  if (event.origin != 'https://app.domain.tld') {
    throw new Error('invalid origin')
  }

  processing();
})
```
