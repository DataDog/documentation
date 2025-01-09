---
aliases:
- /continuous_integration/static_analysis/rules/javascript-browser-security/event-check-origin
- /static_analysis/rules/javascript-browser-security/event-check-origin
dependencies: []
disable_edit: true
group_id: javascript-browser-security
meta:
  category: Security
  id: javascript-browser-security/event-check-origin
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Check origin of events
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-browser-security/event-check-origin`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

**CWE**: [346](https://cwe.mitre.org/data/definitions/346.html)

## Description
Not checking the rule origin can lead to XSS attacks. Always check the event origin.

#### Learn More

 - [XSS and CSS Cheat Sheet from OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

## Non-Compliant Code Examples
```javascript
window.addEventListener('message', (event) => {
  processing();
})
```

## Compliant Code Examples
```javascript
window.addEventListener('message', (event) => {
  if (event.origin != 'https://app.domain.tld') {
    throw new Error('invalid origin')
  }

  processing();
})
```
