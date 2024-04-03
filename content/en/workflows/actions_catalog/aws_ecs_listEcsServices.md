---
bundle: com.datadoghq.aws.ecs
bundle_title: AWS ECS
description: List ECS services in a particular cluster.
icon:
  integration_id: amazon-ecs
  type: integration_logo
input: '#/$defs/ListEcsServicesInputs'
inputFieldOrder:
- region
- cluster
- limit
keywords:
- all
- list
output: '#/$defs/ListEcsServicesOutputs'
permissions:
- ecs:ListServices
source: amazon-ecs
title: List ECS services
---

List ECS services in a particular cluster.

{{< workflows >}}
