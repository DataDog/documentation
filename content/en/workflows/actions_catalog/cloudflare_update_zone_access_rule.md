---
bundle: com.datadoghq.cloudflare
bundle_title: Cloudflare
description: Update the rule state and/or note for a zone. You can only edit rules
  in the `zone` scope via this action.
icon:
  integration_id: cloudflare
  type: integration_logo
input: '#/$defs/UpdateZoneAccessRuleInputs'
inputFieldOrder:
- zoneId
- ruleId
- mode
- notes
keywords:
- modify
- put
- set
- update
output: '#/$defs/UpdateZoneAccessRuleOutputs'
permissions:
- '#firewall_services:edit'
source: cloudflare
title: Update zone access rule
---

Update the rule state and/or note for a zone. You can only edit rules in the `zone` scope via this action.

{{< workflows >}}
