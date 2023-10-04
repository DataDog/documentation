---
aliases:
- /ja/workflows/actions_catalog/aws_cloudfront_getAWSCloudFrontDistribution
bundle: com.datadoghq.aws.cloudfront
bundle_title: AWS CloudFront
description: ディストリビューションの詳細を取得します。
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
title: ディストリビューションの記述
---

ディストリビューションの詳細を取得します。

{{< workflows >}}