---
bundle: com.datadoghq.cloudflare
bundle_title: Cloudflare
description: Make new IP, IP range, or country access rules for a given zone.
icon:
  integration_id: cloudflare
  type: integration_logo
input: '#/$defs/CreateZoneAccessRulesInputs'
inputFieldOrder:
- zoneId
- mode
- targets
- type
- notes
output: '#/$defs/CreateZoneAccessRulesOutputs'
permissions:
- '#firewall_services:edit'
source: cloudflare
title: Create zone access rules
---

Make new IP, IP range, or country access rules for a given zone.

{{< workflows >}}
