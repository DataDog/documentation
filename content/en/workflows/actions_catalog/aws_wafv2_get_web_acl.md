---
bundle: com.datadoghq.aws.wafv2
bundle_title: AWS WAFV2
description: Retrieve a WebACL.
icon:
  integration_id: amazon-waf
  type: integration_logo
input: '#/$defs/GetWebAclInputs'
inputFieldOrder:
- region
- webAclId
- webAclName
- scope
keywords:
- describe
- get
- lookup
output: '#/$defs/GetWebAclOutputs'
permissions:
- wafv2:GetWebACL
source: amazon-waf
title: Get web ACL
---

Retrieve a WebACL.

{{< workflows >}}
