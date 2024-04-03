---
bundle: com.datadoghq.dd.reference_tables
bundle_title: Datadog Reference Tables
description: Checks if a reference table exists, returns true or false.
icon:
  icon_name: Inventories
  type: icon
input: '#/$defs/TableExistsInputs'
inputFieldOrder:
- tableName
output: '#/$defs/TableExistsOutputs'
source: _datadog
title: Table exists
---

Checks if a reference table exists, returns true or false.

{{< workflows >}}
