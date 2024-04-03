---
bundle: com.datadoghq.greynoise
bundle_title: GreyNoise
description: The action provided the full context of the given IP address by putting
  both the RIOT and the noise context of the IP address.
icon:
  integration_id: greynoise
  type: integration_logo
input: '#/$defs/GetAdvancedIPContextInputs'
inputFieldOrder:
- ip
keywords:
- describe
- get
- lookup
output: '#/$defs/GetAdvancedIPContextOutputs'
source: greynoise
title: Get advanced IP context
---

The action provided the full context of the given IP address by putting both the RIOT and the noise context of the IP address.

{{< workflows >}}
