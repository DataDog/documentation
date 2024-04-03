---
bundle: com.datadoghq.greynoise
bundle_title: GreyNoise
description: Check whether a set of IP addresses are "Internet background noise",
  or have been observed scanning or attacking devices across the Internet.
icon:
  integration_id: greynoise
  type: integration_logo
input: '#/$defs/QuickCheckIPsInputs'
inputFieldOrder:
- ips
output: '#/$defs/QuickCheckIPsOutputs'
source: greynoise
title: Quick check IPs
---

Check whether a set of IP addresses are "Internet background noise", or have been observed scanning or attacking devices across the Internet.

{{< workflows >}}
