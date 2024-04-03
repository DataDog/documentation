---
bundle: com.datadoghq.aws.ecs
bundle_title: AWS ECS
description: Update the desired number of instantiations of a service task.
icon:
  integration_id: amazon-ecs
  type: integration_logo
input: '#/$defs/UpdateServiceInputs'
inputFieldOrder:
- region
- serviceName
- desiredCount
- cluster
keywords:
- modify
- put
- set
- update
output: '#/$defs/UpdateServiceOutputs'
permissions:
- ecs:UpdateService
source: amazon-ecs
title: Update service task desired count
---

Update the desired number of instantiations of a service task.

{{< workflows >}}
