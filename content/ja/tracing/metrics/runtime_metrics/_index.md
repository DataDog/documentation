---
aliases:
- /ja/tracing/advanced/runtime_metrics/
- /ja/tracing/runtime_metrics/
description: Gain additional insights into an application's performance with the runtime
  metrics associated to your traces.
kind: documentation
title: Runtime Metrics
type: multi-code-lang
---

{{< img src="tracing/runtime_metrics/jvm_runtime_trace.png" alt="JVM Runtime Trace" >}}

Enable runtime metrics collection in the tracing client to gain additional insights into an application's performance. Runtime metrics can be viewed in the context of a [service][1], correlated in the Trace View at the time of a given request, and utilized anywhere in the platform. Select your language below to learn how to automatically collect your runtime metrics:

{{< partial name="apm/apm-runtime-metrics.html" >}}
<br>

[1]: /ja/tracing/glossary/#services