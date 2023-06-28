---
aliases:
- /ja/workflows/actions_catalog/aws_cloudfront_list_distributions_by_web_acl
bundle: com.datadoghq.aws.cloudfront
bundle_title: AWS CloudFront
description: WAF の Web ACL に関連するディストリビューションをリストアップします。
icon:
  integration_id: amazon-cloudfront
  type: integration_logo
input: '#/$defs/ListDistributionsByWebACLInputs'
inputFieldOrder:
- region
- webAclId
- maxItems
keywords:
- すべて
- list
output: '#/$defs/ListDistributionsByWebACLOutputs'
permissions:
- cloudfront:ListDistributionsByWebACLId
source: amazon-cloudfront
title: Web ACL によるディストリビューションのリストアップ
---

WAF の Web ACL に関連するディストリビューションをリストアップします。

{{< workflows >}}