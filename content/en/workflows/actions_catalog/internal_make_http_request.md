---
bundle: com.datadoghq.internal
bundle_title: Datadog Internal
description: Makes an HTTP request. This action is a forked version of `com.datadoghq.http.request`
  that can access a specific set of internal URLs.
icon:
  icon_name: Api
  type: icon
input: '#/$defs/MakeRequestInputs'
inputFieldOrder: []
internal: true
output: '#/$defs/MakeRequestOutputs'
source: _datadog
title: Make HTTP request
---

Makes an HTTP request. This action is a forked version of `com.datadoghq.http.request` that can access a specific set of internal URLs.

{{< workflows >}}
