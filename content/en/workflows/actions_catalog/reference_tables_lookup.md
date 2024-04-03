---
bundle: com.datadoghq.dd.reference_tables
bundle_title: Datadog Reference Tables
description: 'Look up the row associated with the given primary key by equality only.
  Throws an error if:

  - No table with a matching table name is found

  - No primary key with a matching entry is found'
icon:
  icon_name: Inventories
  type: icon
input: '#/$defs/LookupInputs'
inputFieldOrder:
- tableName
- primaryKey
keywords:
- describe
- get
- lookup
output: '#/$defs/LookupOutputs'
source: _datadog
title: Lookup
---

Look up the row associated with the given primary key by equality only. Throws an error if:
- No table with a matching table name is found
- No primary key with a matching entry is found

{{< workflows >}}
