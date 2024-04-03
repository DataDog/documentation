---
bundle: com.datadoghq.aws.cloudfront
bundle_title: AWS CloudFront
description: Create a new invalidation.
icon:
  integration_id: amazon-cloudfront
  type: integration_logo
input: '#/$defs/CreateInvalidationInputs'
inputFieldOrder:
- region
- distributionId
- paths
- waitForCompletion
output: '#/$defs/CreateInvalidationOutputs'
permissions:
- cloudfront:CreateInvalidation
source: amazon-cloudfront
title: Create invalidation
---

Create a new invalidation.

{{< workflows >}}
