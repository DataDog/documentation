---
title: Python Runtime Metrics
kind: documentation
description: "Gain additional insights into your Python application's performance with the runtime metrics associated to your traces."
aliases:
- /tracing/runtime_metrics/python
code_lang: python
type: multi-code-lang
code_lang_weight: 20
further_reading:
    - link: tracing/other_telemetry/connect_logs_and_traces
      tag: Documentation
      text: Connect your Logs and Traces together
    - link: tracing/trace_collection/custom_instrumentation
      tag: Documentation
      text: Manually instrument your application to create traces.
    - link: tracing/glossary/
      tag: Documentation
      text: Explore your services, resources, and traces
---

<div class="alert alert-warning">
This feature is in public beta.
</div>

## Automatic configuration

Runtime metrics collection can be enabled with the `DD_RUNTIME_METRICS_ENABLED=true` environment parameter when running with `ddtrace-run`.

If you are not using `ddtrace-run`, you can enable runtime metrics collection in code:

```python
from ddtrace.runtime import RuntimeMetrics
RuntimeMetrics.enable()
```

Runtime metrics can be viewed in correlation with your Python services. See the [Service Catalog][1] in Datadog.

**Note**: For the runtime UI, `ddtrace` >= [`0.24.0`][2] is supported.

By default, runtime metrics from your application are sent to the Datadog Agent with DogStatsD over port `8125`. Make sure that [DogStatsD is enabled for the Agent][3].
If you are running the Agent as a container, ensure that `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [is set to true][4], and that port `8125` is open on the Agent.
In Kubernetes, [bind the DogstatsD port to a host port][5]; in ECS, [set the appropriate flags in your task definition][6].

Alternatively, the Agent can ingest metrics with a Unix Domain Socket (UDS) as an alternative to UDP transport. For more information, read [DogStatsD over Unix Domain Socket][8].

## 収集データ

The following metrics are collected by default after enabling runtime metrics:

{{< get-metrics-from-git "python" >}}

Along with displaying these metrics in your APM Service Page, Datadog provides a [default Python Runtime Metrics Dashboard][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.24.0
[3]: /metrics/custom_metrics/dogstatsd_metrics_submission/#setup
[4]: /agent/docker/#dogstatsd-custom-metrics
[5]: /developers/dogstatsd/?tab=kubernetes#agent
[6]: /agent/amazon_ecs/#create-an-ecs-task
[7]: https://app.datadoghq.com/dash/integration/30267/python-runtime-metrics
[8]: /developers/dogstatsd/unix_socket/