---
bundle: com.datadoghq.aws.system_manager
bundle_title: AWS System Manager
description: Bulk update custom inventory items on one or more managed nodes. If a
  specified inventory item does not already exist, it is created.
icon:
  integration_id: amazon-ssm
  type: integration_logo
input: '#/$defs/PutInventoryInputs'
inputFieldOrder:
- region
- instanceId
- items
keywords:
- modify
- put
- set
- update
output: '#/$defs/PutInventoryOutputs'
permissions:
- ssm:PutInventory
source: amazon-ssm
title: Put inventory
---

Bulk update custom inventory items on one or more managed nodes. If a specified inventory item does not already exist, it is created.

{{< workflows >}}
