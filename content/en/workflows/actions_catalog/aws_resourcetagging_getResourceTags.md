---
bundle: com.datadoghq.aws.resourcetagging
bundle_title: AWS Resources Tagging
description: Return all tags associated with a resource.
icon:
  integration_id: aws-service-catalog
  type: integration_logo
input: '#/$defs/GetResourceTagsInputs'
inputFieldOrder:
- region
- resourceArn
keywords:
- describe
- get
- lookup
output: '#/$defs/GetResourceTagsOutputs'
permissions:
- tag:GetResources
source: aws-service-catalog
title: Get resource tags
---

Return all tags associated with a resource.

{{< workflows >}}
