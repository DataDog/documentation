---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-browser-security/local-storage-sensitive-data
  language: JavaScript
  severity: Warning
title: Do not store sensitive data to local storage
---
## Metadata
**ID:** `javascript-browser-security/local-storage-sensitive-data`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

## Description
Do not store sensitive data in `localStorage` and keep the data safe from any malicious software that could read this data.

#### Learn More
 - [CWE-312 - Cleartext Storage of Sensitive Information](https://cwe.mitre.org/data/definitions/312.html)

## Non-Compliant Code Examples
```javascript
localStorage.setItem('user', email)

localStorage.setItem('user', user.email)
```

## Compliant Code Examples
```javascript
localStorage.setItem('user', uuid)

localStorage.setItem('user', user.id)
```
