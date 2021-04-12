---
title: NodeJS Runtime Metrics
kind: documentation
description: "Gain additional insights into your NodeJS application's performance with the runtime metrics associated to your traces."
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

## Automatic Configuration

Runtime metrics collection can be enabled with one configuration parameter in the tracing client either through the tracer option: `tracer.init({ runtimeMetrics: true })` or through the environment variable: `DD_RUNTIME_METRICS_ENABLED=true`

Runtime metrics can be viewed in correlation with your Node services. See the [Service page][1] in Datadog.

By default, runtime metrics from your application are sent to the Datadog Agent with DogStatsD over port `8125`. Make sure that [DogStatsD is enabled for the Agent][2].
If you are running the Agent as a container, ensure that `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [is set to true][3], and that port `8125` is open on the Agent.
In Kubernetes, [bind the DogstatsD port to a host port][4]; in ECS, [set the appropriate flags in your task definition][5].

## Data Collected

The following metrics are collected by default after enabling runtime metrics.

{{< get-metrics-from-git "node" >}}

Along with displaying these metrics in your APM Service Page, Datadog provides a [default Node Runtime Dashboard][6] with the `service` and `runtime-id` tags that are applied to these metrics.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: /developers/metrics/dogstatsd_metrics_submission/#setup
[3]: /agent/docker/#dogstatsd-custom-metrics
[4]: /developers/dogstatsd/?tab=kubernetes#agent
[5]: /integrations/amazon_ecs/?tab=python#create-an-ecs-task
[6]: https://app.datadoghq.com/dash/integration/30269/node-runtime-metrics
