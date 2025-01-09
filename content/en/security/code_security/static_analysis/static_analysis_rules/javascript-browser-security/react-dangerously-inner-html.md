---
aliases:
- /continuous_integration/static_analysis/rules/javascript-browser-security/react-dangerously-inner-html
- /static_analysis/rules/javascript-browser-security/react-dangerously-inner-html
dependencies: []
disable_edit: true
group_id: javascript-browser-security
meta:
  category: Security
  id: javascript-browser-security/react-dangerously-inner-html
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Do not inject unsanitized HTML
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-browser-security/react-dangerously-inner-html`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

**CWE**: [79](https://cwe.mitre.org/data/definitions/79.html)

## Description
Always sanitize HTML data before injecting it in the DOM. Use libraries such as [DOMPurify](https://github.com/cure53/DOMPurify) before using it.

## Non-Compliant Code Examples
```javascript
const App = () => {
  const data = `lorem <b onmouseover="alert('mouseover');">ipsum</b>`;

  return (
    <div
      dangerouslySetInnerHTML={{__html: data}}
      foobar={{foo: bar}}
    >
    </div>
  );
}
```

## Compliant Code Examples
```javascript
const App = () => {
  const data = `lorem <b onmouseover="alert('mouseover');">ipsum</b>`;

  return (
    <div
      dangerouslySetInnerHTML={{__html: sanitize(data)}}
    />
  );
}
```
