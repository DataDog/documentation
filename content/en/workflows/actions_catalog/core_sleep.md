---
bundle: com.datadoghq.core
bundle_title: Datadog Core
description: Wait for the specified duration.
icon:
  icon_name: clock
  type: icon
input: '#/$defs/SleepInputs'
inputFieldOrder:
- durationSeconds
keywords:
- sleep
- pause
output: '#/$defs/SleepOutputs'
source: _datadog
title: Sleep
---

Wait for the specified duration.

{{< workflows >}}
