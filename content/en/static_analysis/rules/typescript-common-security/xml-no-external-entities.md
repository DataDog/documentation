---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-common-security/xml-no-external-entities
  language: TypeScript
  severity: Warning
title: Do not use external XML entities
---
## Metadata
**ID:** `typescript-common-security/xml-no-external-entities`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

## Description
Process external entities in XML files may lead to XXE attack. Do not load external entities unless they have been explicitly checked.

## Non-Compliant Code Examples
```typescript
import libxmljs from 'libxmljs';
import fs from 'fs';

const xml = fs.readFileSync('file.xml', 'utf8');
libxmljs.parseXmlString(xml, {
    noent: true,
});
```

## Compliant Code Examples
```typescript
import libxmljs from 'libxmljs';
import fs from 'fs';

const xml = fs.readFileSync('file.xml', 'utf8');
libxmljs.parseXmlString(xml);

```
