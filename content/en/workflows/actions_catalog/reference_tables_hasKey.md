---
bundle: com.datadoghq.dd.reference_tables
bundle_title: Datadog Reference Tables
description: Check to see if a single primary key exists in a given table. Throws
  an error if no table with a matching table name is found.
icon:
  icon_name: Inventories
  type: icon
input: '#/$defs/HasKeyInputs'
inputFieldOrder:
- tableName
- primaryKey
output: '#/$defs/HasKeyOutputs'
source: _datadog
title: Has key
---

Check to see if a single primary key exists in a given table. Throws an error if no table with a matching table name is found.

{{< workflows >}}
