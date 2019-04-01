---
title: Runtime Metrics
kind: documentation
---

Enable runtime metrics collection in the tracing client to gain additional insight into an application's performance. Runtime metrics can be viewed in the context of a service, correlated in the Trace View at the time of a given request, and utilized anywhere in the platform.

{{< img src="tracing/jvm_runtime_trace.png" alt="JVM Runtime Trace" responsive="true" style="width:100%;">}}

## Automatic Configuration

{{< tabs >}}
{{% tab "Java" %}}

JVM metrics collection can be enabled with one configuration parameter in the tracing client:

* System Property: `-Ddd.jmxfetch.enabled=true`
* Environment Variable: `DD_JMXFETCH_ENABLED=true`

JVM metrics can be viewed in correlation with your Java services. See the [Service page][1] in Datadog.

{{< img src="tracing/jvm-runtime.png" alt="JVM Runtime" responsive="true" style="width:100%;">}}

**Note**: For the runtime UI, `dd-trace-java` >= [`0.24.0`][2] is supported.

**Collecting JVM Metrics in Containerized Environments**

By default, JVM metrics from your application are sent to the Datadog Agent over port 8125. If you are running the Agent as a container, ensure that `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [is set to true][3], and that port 8125 is open on the Agent. For example: in Kubernetes, [bind the DogstatsD port to a host port][4]; in ECS, [set the approriate flags in your task definition][5].


[1]: https://app.datadoghq.com/apm/services
[2]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.0
[3]: /agent/docker/#dogstatsd-custom-metrics
[4]: /agent/kubernetes/dogstatsd/#bind-the-dogstatsd-port-to-a-host-port
[5]: /integrations/amazon_ecs/?tab=python#create-an-ecs-task
{{% /tab %}}
{{% tab "Python" %}}

Coming Soon. Reach out to [the Datadog support team][1] to be part of the beta.

[1]: /help
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

Coming Soon. Reach out to [the Datadog support team][1] to be part of the beta.

[1]: /help
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
