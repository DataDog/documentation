---
bundle: com.datadoghq.aws.cloudfront
bundle_title: AWS CloudFront
description: List CloudFront distributions. A distribution tells CloudFront where
  you want content to be delivered from, and the details about how to track and manage
  content delivery.
icon:
  integration_id: amazon-cloudfront
  type: integration_logo
input: '#/$defs/ListDistributionsInputs'
inputFieldOrder:
- region
- maxItems
keywords:
- all
- list
output: '#/$defs/ListDistributionsOutputs'
permissions:
- cloudfront:ListDistributions
source: amazon-cloudfront
title: List distributions
---

List CloudFront distributions. A distribution tells CloudFront where you want content to be delivered from, and the details about how to track and manage content delivery.

{{< workflows >}}
