---
bundle: com.datadoghq.aws.ecs
bundle_title: AWS ECS
description: List ECS tasks for a particular cluster and service.
icon:
  integration_id: amazon-ecs
  type: integration_logo
input: '#/$defs/ListEcsTasksInputs'
inputFieldOrder:
- region
- cluster
- serviceName
- limit
keywords:
- all
- list
output: '#/$defs/ListEcsTasksOutputs'
permissions:
- ecs:ListTasks
source: amazon-ecs
title: List ECS tasks
---

List ECS tasks for a particular cluster and service.

{{< workflows >}}
