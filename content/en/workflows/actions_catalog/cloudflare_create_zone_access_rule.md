---
bundle: com.datadoghq.cloudflare
bundle_title: Cloudflare
description: Make a new IP, IP range, or country access rule for a given zone.
icon:
  integration_id: cloudflare
  type: integration_logo
input: '#/$defs/CreateZoneAccessRuleInputs'
inputFieldOrder:
- zoneId
- mode
- target
- type
- notes
output: '#/$defs/CreateZoneAccessRuleOutputs'
permissions:
- '#firewall_services:edit'
source: cloudflare
title: Create zone access rule
---

Make a new IP, IP range, or country access rule for a given zone.

{{< workflows >}}
