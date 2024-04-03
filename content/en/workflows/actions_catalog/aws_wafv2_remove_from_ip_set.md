---
bundle: com.datadoghq.aws.wafv2
bundle_title: AWS WAFV2
description: Remove given IPs from an IP set.
icon:
  integration_id: amazon-waf
  type: integration_logo
input: '#/$defs/RemoveFromIpSetInputs'
inputFieldOrder:
- region
- ipSetId
- ipSetName
- addressesToRemove
- scope
keywords:
- delete
- remove
output: '#/$defs/RemoveFromIpSetOutputs'
permissions:
- wafv2:GetIPSet
- wafv2:UpdateIPSet
source: amazon-waf
title: Remove from IP set
---

Remove given IPs from an IP set.

{{< workflows >}}
