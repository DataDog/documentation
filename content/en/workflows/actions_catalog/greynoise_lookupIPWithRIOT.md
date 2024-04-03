---
bundle: com.datadoghq.greynoise
bundle_title: GreyNoise
description: RIOT identifies IPs from known benign services and organizations that
  commonly cause false positives in network security and threat intelligence products.
icon:
  integration_id: greynoise
  type: integration_logo
input: '#/$defs/LookupIPWithRIOTInputs'
inputFieldOrder:
- ip
keywords:
- describe
- get
- lookup
output: '#/$defs/LookupIPWithRIOTOutputs'
source: greynoise
title: Lookup IP with RIOT
---

RIOT identifies IPs from known benign services and organizations that commonly cause false positives in network security and threat intelligence products.

{{< workflows >}}
