---
aliases:
- /continuous_integration/static_analysis/rules/javascript-common-security/xml-no-external-entities
- /static_analysis/rules/javascript-common-security/xml-no-external-entities
dependencies: []
disable_edit: true
group_id: javascript-common-security
meta:
  category: Security
  id: javascript-common-security/xml-no-external-entities
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Do not use external XML entities
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-common-security/xml-no-external-entities`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

**CWE**: [611](https://cwe.mitre.org/data/definitions/611.html)

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
