---
bundle: com.datadoghq.cloudflare
bundle_title: Cloudflare
description: List the access rules for a specific zone
icon:
  integration_id: cloudflare
  type: integration_logo
input: '#/$defs/ListZoneAccessRulesInputs'
inputFieldOrder:
- zoneId
- limit
keywords:
- all
- list
output: '#/$defs/ListZoneAccessRulesOutputs'
permissions:
- '#firewall_services:read'
source: cloudflare
title: List zone access rules
---

List the access rules for a specific zone

{{< workflows >}}
