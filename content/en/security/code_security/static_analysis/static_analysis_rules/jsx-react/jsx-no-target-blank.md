---
aliases:
- /continuous_integration/static_analysis/rules/jsx-react/jsx-no-target-blank
- /static_analysis/rules/jsx-react/jsx-no-target-blank
dependencies: []
disable_edit: true
group_id: jsx-react
meta:
  category: Security
  id: jsx-react/jsx-no-target-blank
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Prevent target='_blank' security risks
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `jsx-react/jsx-no-target-blank`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

## Description
Using `target="_blank"` in an anchor (`<a>`) tag allows a link to be opened in a new browser tab or window.

A malicious website opened through `target="_blank"` can change the `window.opener.location` to a phishing page, potentially misleading users.

This rule enforces using `rel="noreferrer"` with on links that have the `target="_blank"` attribute. It might not be needed if you target modern browsers, but is still recommended to follow it as a best practice.

#### Known Limitations

This rule does not support custom link components without an `href`, `target` and `rel` properties.

## Non-Compliant Code Examples
```jsx
var Hello = <a target='_blank' href="https://example.com/"></a>
var Hello = <a target={`_blank`} href={dynamicLink}></a>
var Nested = <Link target={'_blank'} href="https://example.com/" />
var Nested = <Link target="_blank" href="https://example.com/" />
```

## Compliant Code Examples
```jsx
var Hello = <p target={"_blank"}></p>
var Hello = <p target={`_blank`}></p>
var Hello = <a target="_blank" rel="noreferrer" href="https://example.com"></a>
var Hello = <a target="_blank" rel="noopener noreferrer" href="https://example.com"></a>
var Hello = <a target="_blank" href="relative/path/in/the/host"></a>
var Hello = <a target="_blank" href="/absolute/path/in/the/host"></a>
var Hello = <a></a>
```
