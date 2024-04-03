---
bundle: com.datadoghq.aws.system_manager
bundle_title: AWS System Manager
description: A list of inventory items returned by the request.
icon:
  integration_id: amazon-ssm
  type: integration_logo
input: '#/$defs/ListInventoryDataInputs'
inputFieldOrder:
- region
- instanceId
- typeName
- filters
keywords:
- all
- list
output: '#/$defs/ListInventoryDataOutputs'
permissions:
- ssm:ListInventoryData
source: amazon-ssm
title: List inventory data
---

A list of inventory items returned by the request.

{{< workflows >}}
