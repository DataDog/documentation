---
bundle: com.datadoghq.dd.reference_tables
bundle_title: Datadog Reference Tables
description: Check to see if up to 10,000 primary keys exist in a given table. If
  at least one primary key has a matching row, an output is returned. Throws an error
  if no table with a matching table name is found.
icon:
  icon_name: Inventories
  type: icon
input: '#/$defs/BulkHasKeyInputs'
inputFieldOrder:
- tableName
- primaryKeys
output: '#/$defs/BulkHasKeyOutputs'
source: _datadog
title: Bulk has key
---

Check to see if up to 10,000 primary keys exist in a given table. If at least one primary key has a matching row, an output is returned. Throws an error if no table with a matching table name is found.

{{< workflows >}}
