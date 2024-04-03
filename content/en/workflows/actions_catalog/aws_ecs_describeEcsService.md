---
bundle: com.datadoghq.aws.ecs
bundle_title: AWS ECS
description: Get the full description of your ECS service.
icon:
  integration_id: amazon-ecs
  type: integration_logo
input: '#/$defs/DescribeEcsServiceInputs'
inputFieldOrder:
- region
- serviceName
- cluster
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeEcsServiceOutputs'
permissions:
- ecs:DescribeServices
source: amazon-ecs
title: Describe ECS service
---

Get the full description of your ECS service.

{{< workflows >}}
