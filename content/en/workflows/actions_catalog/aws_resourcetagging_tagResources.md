---
bundle: com.datadoghq.aws.resourcetagging
bundle_title: AWS Resources Tagging
description: Add tags to multiple AWS resources.
icon:
  integration_id: aws-service-catalog
  type: integration_logo
input: '#/$defs/TagResourcesInputs'
inputFieldOrder:
- region
- resourceArns
- tags
output: '#/$defs/TagResourcesOutputs'
permissions:
- tag:TagResources
source: aws-service-catalog
title: Tag resources
---

Add tags to multiple AWS resources.

{{< workflows >}}
