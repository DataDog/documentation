---
bundle: com.datadoghq.dd.reference_tables
bundle_title: Datadog Reference Tables
description: 'Look up the rows associated with up to 10,000 primary keys by equality
  only. If at least one primary key has a matching row, an output will still be returned.
  Throws an error if:

  - No table with a matching table name is found'
icon:
  icon_name: Inventories
  type: icon
input: '#/$defs/BulkLookupInputs'
inputFieldOrder:
- tableName
- primaryKeys
output: '#/$defs/BulkLookupOutputs'
source: _datadog
title: Bulk lookup
---

Look up the rows associated with up to 10,000 primary keys by equality only. If at least one primary key has a matching row, an output will still be returned. Throws an error if:
- No table with a matching table name is found

{{< workflows >}}
