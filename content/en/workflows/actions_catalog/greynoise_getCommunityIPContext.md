---
bundle: com.datadoghq.greynoise
bundle_title: GreyNoise
description: The Community API provides community users with a free tool to query
  IPs in the GreyNoise dataset and retrieve a subset of the full IP context data returned
  by the IP Lookup API.
icon:
  integration_id: greynoise
  type: integration_logo
input: '#/$defs/GetCommunityIPContextInputs'
inputFieldOrder:
- ip
keywords:
- describe
- get
- lookup
output: '#/$defs/GetCommunityIPContextOutputs'
source: greynoise
title: Get community IP context
---

The Community API provides community users with a free tool to query IPs in the GreyNoise dataset and retrieve a subset of the full IP context data returned by the IP Lookup API.

{{< workflows >}}
