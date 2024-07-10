---
title: Go Runtime Metrics
description: "Gain additional insights into your Go application's performance with the runtime metrics associated to your traces."
code_lang: go
type: multi-code-lang
code_lang_weight: 60
aliases:
- /tracing/runtime_metrics/go
further_reading:
    - link: 'tracing/other_telemetry/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/trace_collection/custom_instrumentation'
      tag: 'Documentation'
      text: 'Manually instrument your application to create traces.'
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

## Automatic configuration

To enable Go runtime metrics collection, start the tracer using the `WithRuntimeMetrics` option:

```go
tracer.Start(tracer.WithRuntimeMetrics())
```

View runtime metrics in correlation with your Go services on the [Service Catalog][1] in Datadog.

By default, runtime metrics from your application are sent every 10 seconds to the Datadog Agent with DogStatsD. Make sure that [DogStatsD is enabled for the Agent][2]. If your Datadog Agent DogStatsD address differs from the default `localhost:8125`, use the [`WithDogstatsdAddress`][3] option (available starting in 1.18.0) or the environment variables `DD_AGENT_HOST` and `DD_DOGSTATSD_PORT`.

If `WithDogstatsdAddress` is not used, the tracer attempts to determine the address of the statsd service according to the following rules:
  1. Look for `/var/run/datadog/dsd.socket` and use it if present. IF NOT, continue to #2.
  2. The host is determined by `DD_AGENT_HOST`, and defaults to "localhost".
  3. The port is retrieved from the Agent. If not present, it is determined by `DD_DOGSTATSD_PORT`, and defaults to `8125`.

If you are running the Agent as a container, ensure that `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [is set to true][4], and that port `8125` is open on the Agent. Additionally, for Kubernetes or ECS, follow the guidelines below:

- **Kubernetes**: You _must_ [bind the DogstatsD port to a host port][5].
- **ECS**: [Set the appropriate flags in your task definition][6].

Alternatively, the Agent can ingest metrics with a Unix Domain Socket (UDS) as an alternative to UDP transport. For more information, read [DogStatsD over Unix Domain Socket][8].

## Data Collected

The following metrics are collected by default after enabling Go metrics.

{{< get-metrics-from-git "go" >}}

Along with displaying these metrics in your APM Service Page, Datadog provides a [default Go Runtime Dashboard][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /developers/dogstatsd/#setup
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithDogstatsdAddress
[4]: /agent/docker/#dogstatsd-custom-metrics
[5]: /developers/dogstatsd/?tab=kubernetes#agent
[6]: /agent/amazon_ecs/#create-an-ecs-task
[7]: https://app.datadoghq.com/dash/integration/30587/go-runtime-metrics
[8]: /developers/dogstatsd/unix_socket/