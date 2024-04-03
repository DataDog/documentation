---
bundle: com.datadoghq.greynoise
bundle_title: GreyNoise
description: Get more information about a set of IP addresses. Returns time ranges,
  IP metadata (network owner, ASN, reverse DNS pointer, country), associated actors,
  activity tags, and raw port scan and web request information.
icon:
  integration_id: greynoise
  type: integration_logo
input: '#/$defs/GetIPsContextInputs'
inputFieldOrder:
- ips
keywords:
- describe
- get
- lookup
output: '#/$defs/GetIPsContextOutputs'
source: greynoise
title: Get IPs context
---

Get more information about a set of IP addresses. Returns time ranges, IP metadata (network owner, ASN, reverse DNS pointer, country), associated actors, activity tags, and raw port scan and web request information.

{{< workflows >}}
