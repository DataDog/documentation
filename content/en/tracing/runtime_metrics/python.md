---
title: Python Runtime Metrics
kind: documentation
description: "Gain additional insights into your Python application's performance with the runtime metrics associated to your traces."
further_reading:
    - link: 'tracing/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/manual_instrumentation'
      tag: 'Documentation'
      text: 'Manually instrument your application to create traces.'
    - link: 'tracing/opentracing'
      tag: 'Documentation'
      text: 'Implement Opentracing across your applications.'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

<div class="alert alert-warning">
This feature is currently in private beta. <a href="https://docs.datadoghq.com/help/">Reach out to support</a> to turn on this feature for your account.
</div>

## Automatic configuration

Runtime metrics collection can be enabled with the `DD_RUNTIME_METRICS_ENABLED=true` environment parameter when running with `ddtrace-run`.

If you are not using `ddtrace-run`, you can enable runtime metrics collection in code:

```python
from ddtrace.runtime import RuntimeMetrics
RuntimeMetrics.enable()
```

Runtime metrics can be viewed in correlation with your Python services. See the [Service page][1] in Datadog.

**Note**: For the runtime UI, `ddtrace` >= [`0.24.0`][2] is supported.

By default, runtime metrics from your application are sent to the Datadog Agent with DogStatsD over port `8125`. Make sure that [DogStatsD is enabled for the Agent][3].
If you are running the Agent as a container, ensure that `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [is set to true][4], and that port `8125` is open on the Agent.
In Kubernetes, [bind the DogstatsD port to a host port][5]; in ECS, [set the appropriate flags in your task definition][6].

## Data Collected

The following metrics are collected by default after enabling runtime metrics:

{{< get-metrics-from-git "python" >}}

Along with displaying these metrics in your APM Service Page, Datadog provides a [default Python Runtime Metrics Dashboard][7] with the `service` and `runtime-id` tags that are applied to these metrics.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.24.0
[3]: /developers/metrics/dogstatsd_metrics_submission/#setup
[4]: /agent/docker/#dogstatsd-custom-metrics
[5]: /developers/dogstatsd/?tab=kubernetes#agent
[6]: /integrations/amazon_ecs/?tab=python#create-an-ecs-task
[7]: https://app.datadoghq.com/dash/integration/30267/python-runtime-metrics
