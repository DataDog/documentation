---
bundle: com.datadoghq.cloudflare
bundle_title: Cloudflare
description: Remove an access rule so it is no longer evaluated during requests. You
  can only delete rules in the `zone` scope via this action.
icon:
  integration_id: cloudflare
  type: integration_logo
input: '#/$defs/DeleteZoneAccessRuleInputs'
inputFieldOrder:
- zoneId
- ruleId
- cascade
keywords:
- delete
- remove
output: '#/$defs/DeleteZoneAccessRuleOutputs'
permissions:
- '#firewall_services:edit'
source: cloudflare
title: Delete zone access rule
---

Remove an access rule so it is no longer evaluated during requests. You can only delete rules in the `zone` scope via this action.

{{< workflows >}}
