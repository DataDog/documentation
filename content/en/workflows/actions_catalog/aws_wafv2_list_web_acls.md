---
bundle: com.datadoghq.aws.wafv2
bundle_title: AWS WAFV2
description: Retrieve an array of `WebACLSummary` objects for your web ACLs.
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
- wafv2:ListWebACLs
source: amazon-waf
title: List web ACL
---

Retrieve an array of `WebACLSummary` objects for your web ACLs.

{{< workflows >}}
