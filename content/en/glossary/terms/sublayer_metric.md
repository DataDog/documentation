---
title: sublayer metric
core_product:
  - apm
---
A sublayer metric is the execution duration of a given type or service within a trace.

Some [Tracing Application Metrics][1] are tagged with `sublayer_service` and `sublayer_type` so that you can see the execution time for individual services within a trace.

Sublayer metrics are only available if a service has downstream dependencies.

[1]: /tracing/metrics/metrics_namespace/