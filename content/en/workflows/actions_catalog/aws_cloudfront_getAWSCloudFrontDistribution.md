---
bundle: com.datadoghq.aws.cloudfront
bundle_title: AWS CloudFront
description: Get details about a distribution.
icon:
  integration_id: amazon-cloudfront
  type: integration_logo
input: '#/$defs/GetAWSCloudFrontDistributionInputs'
inputFieldOrder:
- region
- resourceId
keywords:
- describe
- get
- lookup
output: '#/$defs/GetAWSCloudFrontDistributionOutputs'
permissions:
- cloudfront:GetDistribution*
source: amazon-cloudfront
stability: stable
title: Describe distribution
---

Get details about a distribution.

{{< workflows >}}
