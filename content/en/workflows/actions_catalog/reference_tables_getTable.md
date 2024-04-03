---
bundle: com.datadoghq.dd.reference_tables
bundle_title: Datadog Reference Tables
description: 'Returns up to the 99 first rows from the reference table. Throws an
  error if:

  - There is no table with matching table name

  - An incorrect column is given'
icon:
  icon_name: Inventories
  type: icon
input: '#/$defs/GetTableInputs'
inputFieldOrder:
- tableName
- columns
keywords:
- describe
- get
- lookup
output: '#/$defs/GetTableOutputs'
source: _datadog
title: Get table
---

Returns up to the 99 first rows from the reference table. Throws an error if:
- There is no table with matching table name
- An incorrect column is given

{{< workflows >}}
