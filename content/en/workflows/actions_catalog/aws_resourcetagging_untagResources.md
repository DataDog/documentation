---
bundle: com.datadoghq.aws.resourcetagging
bundle_title: AWS Resources Tagging
description: Remove tags from multiple AWS resources.
icon:
  integration_id: aws-service-catalog
  type: integration_logo
input: '#/$defs/UntagResourcesInputs'
inputFieldOrder:
- region
- resourceArns
- tagKeys
output: '#/$defs/UntagResourcesOutputs'
permissions:
- tag:UntagResources
source: aws-service-catalog
title: Untag resources
---

Remove tags from multiple AWS resources.

{{< workflows >}}
