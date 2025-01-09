---
aliases:
- /continuous_integration/static_analysis/rules/javascript-node-security/detect-buffer-noassert
- /static_analysis/rules/javascript-node-security/detect-buffer-noassert
dependencies: []
disable_edit: true
group_id: javascript-node-security
meta:
  category: Security
  id: javascript-node-security/detect-buffer-noassert
  language: JavaScript
  severity: Error
  severity_rank: 1
title: Avoid calls to 'buffer' with 'noAssert' flag set
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-node-security/detect-buffer-noassert`

**Language:** JavaScript

**Severity:** Error

**Category:** Security

## Description
Avoid calls to [`buffer`](https://nodejs.org/api/buffer.html) with `noAssert`. If you skip the `offset` validation it can go beyond the end of the `Buffer`.

## Non-Compliant Code Examples
```javascript
a.readUInt8(0, true)
a.readUInt16LE(0, true)
a.readUInt16BE(0, true)
a.readUInt32LE(0, true)
a.readUInt32BE(0, true)
a.readInt8(0, true)
a.readInt16LE(0, true)
a.readInt16BE(0, true)
a.readInt32LE(0, true)
a.readInt32BE(0, true)
a.readFloatLE(0, true)
a.readFloatBE(0, true)
a.readDoubleLE(0, true)
a.readDoubleBE(0, true)
a.writeUInt8(0, 0, true)
a.writeUInt16LE(0, 0, true)
a.writeUInt16BE(0, 0, true)
a.writeUInt32LE(0, 0, true)
a.writeUInt32BE(0, 0, true)
a.writeInt8(0, 0, true)
a.writeInt16LE(0, 0, true)
a.writeInt16BE(0, 0, true)
a.writeInt32LE(0, 0, true)
a.writeInt32BE(0, 0, true)
a.writeFloatLE(0, 0, true)
a.writeFloatBE(0, 0, true)
a.writeDoubleLE(0, 0, true)
a.writeDoubleBE(0, 0, true)

```

## Compliant Code Examples
```javascript
a.readUInt8(0)
a.readUInt16LE(0)
a.readUInt16BE(0)
a.readUInt32LE(0)
a.readUInt32BE(0)
a.readInt8(0)
a.readInt16LE(0)
a.readInt16BE(0)
a.readInt32LE(0)
a.readInt32BE(0)
a.readFloatLE(0)
a.readFloatBE(0)
a.readDoubleLE(0)
a.readDoubleBE(0)
a.writeUInt8(0)
a.writeUInt16LE(0)
a.writeUInt16BE(0)
a.writeUInt32LE(0)
a.writeUInt32BE(0)
a.writeInt8(0)
a.writeInt16LE(0)
a.writeInt16BE(0)
a.writeInt32LE(0)
a.writeInt32BE(0)
a.writeFloatLE(0)
a.writeFloatBE(0)
a.writeDoubleLE(0)
a.writeDoubleBE(0)
a.readUInt8(0, false)
a.readUInt16LE(0, false)
a.readUInt16BE(0, false)
a.readUInt32LE(0, false)
a.readUInt32BE(0, false)
a.readInt8(0, false)
a.readInt16LE(0, false)
a.readInt16BE(0, false)
a.readInt32LE(0, false)
a.readInt32BE(0, false)
a.readFloatLE(0, false)
a.readFloatBE(0, false)
a.readDoubleLE(0, false)
a.readDoubleBE(0, false)
a.writeUInt8(0, false)
a.writeUInt16LE(0, false)
a.writeUInt16BE(0, false)
a.writeUInt32LE(0, false)
a.writeUInt32BE(0, false)
a.writeInt8(0, false)
a.writeInt16LE(0, false)
a.writeInt16BE(0, false)
a.writeInt32LE(0, false)
a.writeInt32BE(0, false)
a.writeFloatLE(0, false)
a.writeFloatBE(0, false)
a.writeDoubleLE(0, false)
a.writeDoubleBE(0, false)
```
