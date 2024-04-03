---
bundle: com.datadoghq.aws.waf.classic
bundle_title: AWS WAF classic
description: Return an array of `WebACLSummary` objects in the response.
icon:
  integration_id: amazon-waf
  type: integration_logo
input: '#/$defs/ListWebAclsInputs'
inputFieldOrder:
- region
- limit
- scope
keywords:
- all
- list
output: '#/$defs/ListWebAclsOutputs'
permissions:
- waf:ListWebACLs
source: amazon-waf
title: List web ACL (WAF Classic)
---

Return an array of `WebACLSummary` objects in the response.

{{< workflows >}}
