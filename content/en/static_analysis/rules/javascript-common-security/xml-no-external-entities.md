---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-common-security/xml-no-external-entities
  language: JavaScript
  severity: Warning
title: Do not use external XML entities
---
## Metadata
**ID:** `javascript-common-security/xml-no-external-entities`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

## Description
Process external entities in XML files may lead to XXE attack. Do not load external entities unless they have been explicitly checked.

## Non-Compliant Code Examples
```javascript
var libxmljs = require('libxmljs');
var fs = require('fs');

var xml = fs.readFileSync('file.xml', 'utf8');
libxmljs.parseXmlString(xml, {
    noent: true,
});
```

## Compliant Code Examples
```javascript
var libxmljs = require('libxmljs');
var fs = require('fs');

var xml = fs.readFileSync('file.xml', 'utf8');
libxmljs.parseXmlString(xml);

```
