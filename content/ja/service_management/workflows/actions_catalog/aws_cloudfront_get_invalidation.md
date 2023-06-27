---
aliases:
- /ja/workflows/actions_catalog/aws_cloudfront_get_invalidation
bundle: com.datadoghq.aws.cloudfront
bundle_title: AWS CloudFront
description: 無効化に関する情報を取得します。
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
title: 無効化の記述
---

無効化に関する情報を取得します。

{{< workflows >}}