---
bundle: com.datadoghq.aws.ecs
bundle_title: AWS ECS
description: List ECS clusters in a particular region.
icon:
  integration_id: amazon-ecs
  type: integration_logo
input: '#/$defs/ListEcsClustersInputs'
inputFieldOrder:
- region
- limit
keywords:
- all
- list
output: '#/$defs/ListEcsClustersOutputs'
permissions:
- ecs:ListClusters
source: amazon-ecs
title: List ECS clusters
---

List ECS clusters in a particular region.

{{< workflows >}}
