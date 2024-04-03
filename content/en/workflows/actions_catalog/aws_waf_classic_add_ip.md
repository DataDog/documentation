---
bundle: com.datadoghq.aws.waf.classic
bundle_title: AWS WAF classic
description: Add given IPs to an IP set if they don't already exist.
icon:
  integration_id: amazon-waf
  type: integration_logo
input: '#/$defs/AddIpMatchInputs'
inputFieldOrder:
- region
- ipSetId
- ipType
- ipAddresses
- scope
output: '#/$defs/AddIpMatchOutputs'
permissions:
- waf:CreateIPSet
- waf:GetChangeToken
- waf:UpdateIPSet
- waf:GetIPSet
source: amazon-waf
title: Add to IP set (WAF Classic)
---

Add given IPs to an IP set if they don't already exist.

{{< workflows >}}
