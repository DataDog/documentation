---
bundle: com.datadoghq.aws.cloudfront
bundle_title: AWS CloudFront
description: Get information about an invalidation.
icon:
  integration_id: amazon-cloudfront
  type: integration_logo
input: '#/$defs/GetInvalidationInputs'
inputFieldOrder:
- region
- distributionId
- id
keywords:
- describe
- get
- lookup
output: '#/$defs/GetInvalidationOutputs'
permissions:
- cloudfront:GetInvalidation
source: amazon-cloudfront
title: Describe invalidation
---

Get information about an invalidation.

{{< workflows >}}
