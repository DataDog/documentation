---
aliases:
- /ja/workflows/actions_catalog/aws_cloudfront_list_distributions
bundle: com.datadoghq.aws.cloudfront
bundle_title: AWS CloudFront
description: CloudFront のディストリビューションをリストアップします。ディストリビューションは、コンテンツをどこから配信させたいか、コンテンツ配信の追跡・管理方法の詳細を
  CloudFront に伝えるものです。
icon:
  integration_id: amazon-cloudfront
  type: integration_logo
input: '#/$defs/ListDistributionsInputs'
inputFieldOrder:
- region
- maxItems
keywords:
- すべて
- list
output: '#/$defs/ListDistributionsOutputs'
permissions:
- cloudfront:ListDistributions
source: amazon-cloudfront
title: ディストリビューションのリストアップ
---

CloudFront のディストリビューションをリストアップします。ディストリビューションは、コンテンツをどこから配信させたいか、コンテンツ配信の追跡・管理方法の詳細を CloudFront に伝えるものです。

{{< workflows >}}