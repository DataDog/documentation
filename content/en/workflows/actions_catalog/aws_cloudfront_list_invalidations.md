---
bundle: com.datadoghq.aws.cloudfront
bundle_title: AWS CloudFront
description: List invalidation batches.
icon:
  integration_id: amazon-cloudfront
  type: integration_logo
input: '#/$defs/ListInvalidationsInputs'
inputFieldOrder:
- region
- distributionId
- maxItems
keywords:
- all
- list
output: '#/$defs/ListInvalidationsOutputs'
permissions:
- cloudfront:ListInvalidations
source: amazon-cloudfront
title: List invalidations
---

List invalidation batches.

{{< workflows >}}
