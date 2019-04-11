---
title: Runtime Metrics
kind: documentation
further_reading:
- link: "tracing/advanced/connect_logs_and_traces"
  tags: "Enrich Tracing"
  text: "Connect your Logs and Traces together"
- link: "tracing/advanced/manual_instrumentation"
  tags: "Enrich Tracing"
  text: "Instrument manually your application to create traces."
- link: "tracing/advanced/opentracing"
  tags: "Enrich Tracing"
  text: "Implement Opentracing across your applications."
- link: "tracing/visualization/"
  tag: "Use the APM UI"
  text: "Explore your services, resources, and traces"
---

Enable runtime metrics collection in the tracing client to gain additional insight into an application's performance. Runtime metrics can be viewed in the context of a service, correlated in the Trace View at the time of a given request, and utilized anywhere in the platform.

{{< img src="tracing/advanced/runtime_metrics/jvm_runtime_trace.png" alt="JVM Runtime Trace" responsive="true">}}

## Automatic Configuration

{{< tabs >}}
{{% tab "Java" %}}

JVM metrics collection can be enabled with one configuration parameter in the tracing client:

* System Property: `-Ddd.jmxfetch.enabled=true`
* Environment Variable: `DD_JMXFETCH_ENABLED=true`

JVM metrics can be viewed in correlation with your Java services. See the [Service page][1] in Datadog.

{{< img src="tracing/advanced/runtime_metrics/jvm-runtime.png" alt="JVM Runtime" responsive="true" >}}

**Note**: For the runtime UI, `dd-trace-java` >= [`0.24.0`][2] is supported.

**Collecting JVM Metrics in Containerized Environments**

By default, JVM metrics from your application are sent to the Datadog Agent over port 8125. If you are running the Agent as a container, ensure that `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [is set to true][3], and that port 8125 is open on the Agent. For example: in Kubernetes, [bind the DogstatsD port to a host port][4]; in ECS, [set the appropriate flags in your task definition][5].


[1]: https://app.datadoghq.com/apm/services
[2]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.0
[3]: /agent/docker/#dogstatsd-custom-metrics
[4]: /agent/kubernetes/dogstatsd/#bind-the-dogstatsd-port-to-a-host-port
[5]: /integrations/amazon_ecs/?tab=python#create-an-ecs-task
{{% /tab %}}
{{% tab "Python" %}}

Python metrics collection can be enabled with one environment parameter when running with `ddtrace-run`:

* Environment Variable: `DD_RUNTIME_METRICS_ENABLED=true`

Python metrics can be viewed in correlation with your Python services. See the [Service page][1] in Datadog.

{{< img src="tracing/advanced/runtime_metrics/python-runtime.png" alt="Python Runtime" responsive="true" >}}

**Note**: For the runtime UI, `ddtrace` >= [`0.24.0`][2] is supported.

[1]: https://app.datadoghq.com/apm/services
[2]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.24.0
{{% /tab %}}
{{% tab "Ruby" %}}

Coming Soon. Reach out to [the Datadog support team][1] to be part of the beta.

[1]: /help
{{% /tab %}}
{{% tab "Go" %}}

Coming Soon. Reach out to [the Datadog support team][1] to be part of the beta.


[1]: /help
{{% /tab %}}
{{% tab "Node.js" %}}

Coming Soon. Reach out to [the Datadog support team][1] to be part of the beta.


[1]: /help
{{% /tab %}}
{{% tab ".NET" %}}

Coming Soon. Reach out to [the Datadog support team][1] to be part of the beta.


[1]: /help
{{% /tab %}}
{{% tab "PHP" %}}

Coming Soon. Reach out to [the Datadog support team][1] to be part of the beta.


[1]: /help
{{% /tab %}}
{{< /tabs >}}

## Data Collected

{{< tabs >}}
{{% tab "Java" %}}

The following metrics are collected by default after enabling JVM metrics.

{{< get-metrics-from-git "java" >}}

Along with displaying these metrics in your APM Service Page, Datadog provides a [default JVM Runtime Dashboard][1] with the `service` and `runtime-id` tags that are applied to these metrics.

Additional JMX metrics can be added using configuration files that are passed to `jmxfetch.metrics-configs`. You can also enable existing Datadog JMX integrations individually with the `dd.integration.<name>` parameter. This auto-embeds configuration from Datadog's [existing JMX configuration files][2]. See the [JMX Integration][3] for further details on configuration.

[1]: https://app.datadoghq.com/dash/integration/256/jvm-runtime-metrics
[2]: https://github.com/DataDog/integrations-core/search?q=jmx_metrics&unscoped_q=jmx_metrics
[3]: /integrations/java/#configuration
{{% /tab %}}
{{% tab "Python" %}}

{{< get-metrics-from-git "python" >}}

Along with displaying these metrics in your APM Service Page, Datadog provides a [default Python Runtime Metrics Dashboard][1] with the `service` and `runtime-id` tags that are applied to these metrics.

[1]: https://app.datadoghq.com/dash/integration/xyz/python-runtime-metrics
{{% /tab %}}
{{% tab "Ruby" %}}

Coming Soon. Reach out to [the Datadog support team][1] to be part of the beta.

[1]: /help
{{% /tab %}}
{{% tab "Go" %}}

Coming Soon. Reach out to [the Datadog support team][1] to be part of the beta.


[1]: /help
{{% /tab %}}
{{% tab "Node.js" %}}

Coming Soon. Reach out to [the Datadog support team][1] to be part of the beta.


[1]: /help
{{% /tab %}}
{{% tab ".NET" %}}

Coming Soon. Reach out to [the Datadog support team][1] to be part of the beta.


[1]: /help
{{% /tab %}}
{{% tab "PHP" %}}

Coming Soon. Reach out to [the Datadog support team][1] to be part of the beta.


[1]: /help
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
