---
bundle: com.datadoghq.aws.wafv2
bundle_title: AWS WAFV2
description: Retrieve an array of `IPSetSummary` objects for your IP sets.
icon:
  integration_id: amazon-waf
  type: integration_logo
input: '#/$defs/ListIpSetsInputs'
inputFieldOrder:
- region
- limit
- scope
keywords:
- all
- list
output: '#/$defs/ListIpSetsOutputs'
permissions:
- wafv2:ListIPSets
source: amazon-waf
title: List IP set
---

Retrieve an array of `IPSetSummary` objects for your IP sets.

{{< workflows >}}
