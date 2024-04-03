---
bundle: com.datadoghq.aws.wafv2
bundle_title: AWS WAFV2
description: Add given IPs to an IP set if they don't already exist.
icon:
  integration_id: amazon-waf
  type: integration_logo
input: '#/$defs/AddToIpSetInputs'
inputFieldOrder:
- region
- ipSetId
- ipSetName
- addressesToAdd
- scope
output: '#/$defs/AddToIpSetOutputs'
permissions:
- wafv2:GetIPSet
- wafv2:UpdateIPSet
source: amazon-waf
title: Add to IP set
---

Add given IPs to an IP set if they don't already exist.

{{< workflows >}}
