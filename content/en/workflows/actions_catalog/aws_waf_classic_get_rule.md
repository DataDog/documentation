---
bundle: com.datadoghq.aws.waf.classic
bundle_title: AWS WAF classic
description: Return the rule associated with the `RuleId` included in the `GetRule`
  request.
icon:
  integration_id: amazon-waf
  type: integration_logo
input: '#/$defs/GetRuleInputs'
inputFieldOrder:
- region
- ruleId
- scope
keywords:
- describe
- get
- lookup
output: '#/$defs/GetRuleOutputs'
permissions:
- waf:GetRule
source: amazon-waf
title: Get rule (WAF Classic)
---

Return the rule associated with the `RuleId` included in the `GetRule` request.

{{< workflows >}}
