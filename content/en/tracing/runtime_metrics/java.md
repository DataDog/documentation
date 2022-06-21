---
title: Java Runtime Metrics
kind: documentation
description: "Gain additional insights into your Java application's performance with the runtime metrics associated to your traces."
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

## Automatic configuration

JVM metrics collection is enabled by default for Java tracer v0.29.0+. It can be disabled with one configuration parameter in the tracing client, either through a system property, `-Ddd.jmxfetch.enabled=false`, or through an environment variable, `DD_JMXFETCH_ENABLED=false`. As of v0.64.0+, you can also use the `DD_RUNTIME_METRICS_ENABLED=false` environment variable to disable it.

JVM metrics can be viewed in correlation with your Java services. See the [Service page][1] in Datadog.

{{< img src="tracing/runtime_metrics/jvm-runtime.png" alt="JVM Runtime"  >}}

By default, runtime metrics from your application are sent to the Datadog Agent with DogStatsD over port `8125`. Make sure that [DogStatsD is enabled for the Agent][2].

If you are running the Agent as a container, ensure that `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [is set to true][3], and that port `8125` is open on the Agent. Additionally, for:

- **Kubernetes**: You _must_ [bind the DogstatsD port to a host port][4].
- **ECS**: [Set the appropriate flags in your task definition][5].

**Notes**:

- For the runtime UI, `dd-trace-java` >= [`0.24.0`][6] is supported.
- To associate JVM metrics within flame graphs, ensure the `env: tag` (case-sensitive) is set and matching across your environment.
- For JVM metrics to appear on the service page when using Fargate, ensure that `DD_DOGSTATSD_TAGS` is set on your Agent task, and matches the `env: tag` of that service.

## Data Collected

The following metrics are collected by default per JVM process after enabling JVM metrics.

{{< get-metrics-from-git "java" >}}

Along with displaying these metrics in your APM Service Page, Datadog provides a [default JVM Runtime Dashboard][7].

Additional JMX metrics can be added using configuration files that are passed on using `dd.jmxfetch.config.dir` and `dd.jmxfetch.config`. You can also enable existing Datadog JMX integrations individually with the `dd.jmxfetch.<INTEGRATION_NAME>.enabled=true` parameter. This auto-embeds configuration from Datadog's [existing JMX configuration files][8]. See the [JMX Integration][9] for further details on configuration.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: /developers/dogstatsd/#setup
[3]: /agent/docker/#dogstatsd-custom-metrics
[4]: /developers/dogstatsd/?tab=kubernetes#agent
[5]: /agent/amazon_ecs/#create-an-ecs-task
[6]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.0
[7]: https://app.datadoghq.com/dash/integration/256/jvm-runtime-metrics
[8]: https://github.com/DataDog/integrations-core/search?q=jmx_metrics&unscoped_q=jmx_metrics
[9]: /integrations/java/#configuration
