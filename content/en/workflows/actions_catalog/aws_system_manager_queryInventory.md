---
bundle: com.datadoghq.aws.system_manager
bundle_title: AWS System Manager
description: Query inventory information. This includes managed node status, such
  as `Stopped` or `Terminated`.
icon:
  integration_id: amazon-ssm
  type: integration_logo
input: '#/$defs/QueryInventoryInputs'
inputFieldOrder:
- region
- filters
output: '#/$defs/QueryInventoryOutputs'
permissions:
- ssm:GetInventory
source: amazon-ssm
title: Query inventory
---

Query inventory information. This includes managed node status, such as `Stopped` or `Terminated`.

{{< workflows >}}
