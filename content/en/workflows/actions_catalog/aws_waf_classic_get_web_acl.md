---
bundle: com.datadoghq.aws.waf.classic
bundle_title: AWS WAF classic
description: Return the WebACL specified by `WebACLId`.
icon:
  integration_id: amazon-waf
  type: integration_logo
input: '#/$defs/GetWebAclInputs'
inputFieldOrder:
- region
- webAclId
- scope
keywords:
- describe
- get
- lookup
output: '#/$defs/GetWebAclOuputs'
permissions:
- waf:GetWebACL
source: amazon-waf
title: Get web ACL (WAF Classic)
---

Return the WebACL specified by `WebACLId`.

{{< workflows >}}
