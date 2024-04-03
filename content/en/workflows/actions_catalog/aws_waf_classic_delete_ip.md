---
bundle: com.datadoghq.aws.waf.classic
bundle_title: AWS WAF classic
description: Remove given IPs from an IP set.
icon:
  integration_id: amazon-waf
  type: integration_logo
input: '#/$defs/DeleteIpMatchInputs'
inputFieldOrder: []
keywords:
- delete
- remove
output: '#/$defs/DeleteIpMatchOuputs'
permissions:
- waf:CreateIPSet
- waf:GetChangeToken
- waf:UpdateIPSet
- waf:DeleteIPSet
source: amazon-waf
title: Remove from IP set (WAF Classic)
---

Remove given IPs from an IP set.

{{< workflows >}}
