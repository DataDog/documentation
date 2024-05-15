---
bundle: com.datadoghq.aws.cloudfront
bundle_title: AWS CloudFront
description: 無効化バッチをリストアップします。
icon:
  integration_id: amazon-cloudfront
  type: integration_logo
input: '#/$defs/ListInvalidationsInputs'
inputFieldOrder:
- region
- distributionId
- maxItems
keywords:
- すべて
- list
output: '#/$defs/ListInvalidationsOutputs'
permissions:
- cloudfront:ListInvalidations
source: amazon-cloudfront
title: 無効化のリストアップ
---

無効化バッチをリストアップします。

{{< workflows >}}