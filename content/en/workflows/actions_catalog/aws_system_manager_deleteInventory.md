---
bundle: com.datadoghq.aws.system_manager
bundle_title: AWS System Manager
description: Delete a custom inventory type or the data associated with a custom inventory
  type. Deleting a custom inventory type is also referred to as deleting a custom
  inventory schema.
icon:
  integration_id: amazon-ssm
  type: integration_logo
input: '#/$defs/DeleteInventoryInputs'
inputFieldOrder:
- region
- typeName
keywords:
- delete
- remove
output: '#/$defs/DeleteInventoryOutputs'
permissions:
- ssm:DeleteInventory
source: amazon-ssm
title: Delete inventory
---

Delete a custom inventory type or the data associated with a custom inventory type. Deleting a custom inventory type is also referred to as deleting a custom inventory schema.

{{< workflows >}}
