---
bundle: com.datadoghq.aws.resourcetagging
bundle_title: AWS Resources Tagging
description: Get all resources with the tags specified in the filters. If the filter
  list is empty, the response includes all resources that are currently tagged or
  have ever had a tag.
icon:
  integration_id: aws-service-catalog
  type: integration_logo
input: '#/$defs/GetResourcesByTagsInputs'
inputFieldOrder:
- region
- resourceTypes
- filters
keywords:
- describe
- get
- lookup
output: '#/$defs/GetResourcesByTagsOutputs'
permissions:
- tag:GetResources
source: aws-service-catalog
title: Get resources by tags
---

Get all resources with the tags specified in the filters. If the filter list is empty, the response includes all resources that are currently tagged or have ever had a tag.

{{< workflows >}}
