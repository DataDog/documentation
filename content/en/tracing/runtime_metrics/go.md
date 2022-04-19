---
title: Go Runtime Metrics
kind: documentation
description: "Gain additional insights into your Go application's performance with the runtime metrics associated to your traces."
further_reading:
    - link: 'tracing/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces'
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

## Automatic configuration

To enable Go runtime metrics collection, start the tracer using the `WithRuntimeMetrics` option:

```go
tracer.Start(tracer.WithRuntimeMetrics())
```

View runtime metrics in correlation with your Go services on the [Service page][1] in Datadog.

By default, runtime metrics from your application are sent every 10 seconds to the Datadog Agent with DogStatsD over port `8125`. Make sure that [DogStatsD is enabled for the Agent][2]. If your Datadog Agent DogStatsD address differs from the default `localhost:8125`, use the `WithDogstatsdAddress` option or the environment variables `DD_AGENT_HOST` and `DD_DOGSTATSD_PORT`.

If you are running the Agent as a container, ensure that `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [is set to true][3], and that port `8125` is open on the Agent. Additionally, for:

- **Kubernetes**: You _must_ [bind the DogstatsD port to a host port][4].
- **ECS**: [Set the appropriate flags in your task definition][5].

## Data Collected

The following metrics are collected by default after enabling Go metrics.

{{< get-metrics-from-git "go" >}}

Along with displaying these metrics in your APM Service Page, Datadog provides a [default Go Runtime Dashboard][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: /developers/dogstatsd/#setup
[3]: /agent/docker/#dogstatsd-custom-metrics
[4]: /developers/dogstatsd/?tab=kubernetes#agent
[5]: /agent/amazon_ecs/#create-an-ecs-task
[6]: https://app.datadoghq.com/dash/integration/30587/go-runtime-metrics
