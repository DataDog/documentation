---
bundle: com.datadoghq.aws.cloudfront
bundle_title: AWS CloudFront
description: List the distributions that are associated with a WAF web ACL.
icon:
  integration_id: amazon-cloudfront
  type: integration_logo
input: '#/$defs/ListDistributionsByWebACLInputs'
inputFieldOrder:
- region
- webAclId
- maxItems
keywords:
- all
- list
output: '#/$defs/ListDistributionsByWebACLOutputs'
permissions:
- cloudfront:ListDistributionsByWebACLId
source: amazon-cloudfront
title: List distributions by Web ACL
---

List the distributions that are associated with a WAF web ACL.

{{< workflows >}}
