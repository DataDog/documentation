---
bundle: com.datadoghq.aws.wafv2
bundle_title: AWS WAFV2
description: Retrieve an IP set.
icon:
  integration_id: amazon-waf
  type: integration_logo
input: '#/$defs/GetIpSetInputs'
inputFieldOrder:
- region
- ipSetId
- ipSetName
- scope
keywords:
- describe
- get
- lookup
output: '#/$defs/GetIpSetOutputs'
permissions:
- wafv2:GetIPSet
source: amazon-waf
title: Get IP set
---

Retrieve an IP set.

{{< workflows >}}
