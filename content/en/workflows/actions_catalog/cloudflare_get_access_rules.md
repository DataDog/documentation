---
bundle: com.datadoghq.cloudflare
bundle_title: Cloudflare
description: Get the access rules of an IP, IP range, or country. This returns access
  rules created for the target by the zone itself, or the account/user to which that
  zone belongs.
icon:
  integration_id: cloudflare
  type: integration_logo
input: '#/$defs/GetAccessRulesInputs'
inputFieldOrder:
- zoneId
- target
keywords:
- describe
- get
- lookup
output: '#/$defs/GetAccessRulesOutputs'
permissions:
- '#firewall_services:read'
source: cloudflare
title: Get access rules
---

Get the access rules of an IP, IP range, or country. This returns access rules created for the target by the zone itself, or the account/user to which that zone belongs.

{{< workflows >}}
