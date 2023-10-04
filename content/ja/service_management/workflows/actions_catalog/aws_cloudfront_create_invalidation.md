---
aliases:
- /ja/workflows/actions_catalog/aws_cloudfront_create_invalidation
bundle: com.datadoghq.aws.cloudfront
bundle_title: AWS CloudFront
description: 新しい無効化を作成します。
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
title: 無効化の作成
---

新しい無効化を作成します。

{{< workflows >}}