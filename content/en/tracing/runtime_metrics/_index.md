---
title: Runtime Metrics
kind: documentation
aliases:
  - /tracing/advanced/runtime_metrics/
further_reading:
- link: "tracing/connect_logs_and_traces"
  tags: "Enrich Tracing"
  text: "Connect your Logs and Traces together"
- link: "tracing/manual_instrumentation"
  tags: "Enrich Tracing"
  text: "Manually instrument your application to create traces."
- link: "tracing/opentracing"
  tags: "Enrich Tracing"
  text: "Implement Opentracing across your applications."
- link: "tracing/visualization/"
  tag: "Use the APM UI"
  text: "Explore your services, resources, and traces"
---

Enable runtime metrics collection in the tracing client to gain additional insights into an application's performance. Runtime metrics can be viewed in the context of a [service][1], correlated in the Trace View at the time of a given request, and utilized anywhere in the platform.

{{< img src="tracing/runtime_metrics/jvm_runtime_trace.png" alt="JVM Runtime Trace" >}}

## Automatic Configuration

{{< tabs >}}
{{% tab "Java" %}}

JVM metrics collection is enabled by default for Java tracer v0.29.0+. It can be disabled with one configuration parameter in the tracing client, either through a system property, `-Ddd.jmxfetch.enabled=false`, or through an environment variable, `DD_JMXFETCH_ENABLED=false`.

JVM metrics can be viewed in correlation with your Java services. See the [Service page][1] in Datadog.

{{< img src="tracing/runtime_metrics/jvm-runtime.png" alt="JVM Runtime"  >}}

By default, runtime metrics from your application are sent to the Datadog Agent with DogStatsD over port `8125`. Make sure that [DogStatsD is enabled for the Agent][2].

If you are running the Agent as a container, ensure that `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [is set to true][3], and that port `8125` is open on the Agent. Additionally, for:

* **Kubernetes**: You *must* [bind the DogstatsD port to a host port][4].
* **ECS**: [Set the appropriate flags in your task definition][5].

**Notes**:

* For the runtime UI, `dd-trace-java` >= [`0.24.0`][6] is supported.
* To associate JVM metrics within flame graphs, ensure the `env: tag` (case-sensitive) is set and matching across your environment.

[1]: https://app.datadoghq.com/apm/services
[2]: /developers/dogstatsd/#setup
[3]: /agent/docker/#dogstatsd-custom-metrics
[4]: /agent/kubernetes/dogstatsd/#bind-the-dogstatsd-port-to-a-host-port
[5]: /integrations/amazon_ecs/?tab=python#create-an-ecs-task
[6]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.0
{{% /tab %}}
{{% tab "Python" %}}

<div class="alert alert-warning">
This feature is currently in private beta. <a href="https://docs.datadoghq.com/help/">Reach out to support</a> to turn on this feature for your account.
</div>

Runtime metrics collection can be enabled with the `DD_RUNTIME_METRICS_ENABLED=true` environment parameter when running with `ddtrace-run`:

Runtime metrics can be viewed in correlation with your Python services. See the [Service page][1] in Datadog.

**Note**: For the runtime UI, `ddtrace` >= [`0.24.0`][2] is supported.

By default, runtime metrics from your application are sent to the Datadog Agent thanks to DogStatsD over port `8125`. Make sure that [DogStatsD is enabled for the Agent][3].
If you are running the Agent as a container, ensure that `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [is set to true][4], and that port `8125` is open on the Agent.
In Kubernetes, [bind the DogstatsD port to a host port][5]; in ECS, [set the appropriate flags in your task definition][6].

[1]: https://app.datadoghq.com/apm/services
[2]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.24.0
[3]: /developers/metrics/dogstatsd_metrics_submission/#setup
[4]: /agent/docker/#dogstatsd-custom-metrics
[5]: /agent/kubernetes/dogstatsd/#bind-the-dogstatsd-port-to-a-host-port
[6]: /integrations/amazon_ecs/?tab=python#create-an-ecs-task
{{% /tab %}}
{{% tab "Ruby" %}}

<div class="alert alert-warning">
This feature is currently in private beta. <a href="https://docs.datadoghq.com/help/">Reach out to support</a> to turn on this feature for your account.
</div>

Runtime metrics collection uses the [`dogstatsd-ruby`][1] gem to send metrics via DogStatsD to the Agent. To collect runtime metrics, you must add this gem to your Ruby application, and make sure that [DogStatsD is enabled for the Agent][2].

Metrics collection is disabled by default. You can enable it by setting the `DD_RUNTIME_METRICS_ENABLED` environment variable to `true`, or by setting the following configuration in your Ruby application:

```ruby
# config/initializers/datadog.rb
require 'datadog/statsd'
require 'ddtrace'

Datadog.configure do |c|
  # To enable runtime metrics collection, set `true`. Defaults to `false`
  # You can also set DD_RUNTIME_METRICS_ENABLED=true to configure this.
  c.runtime_metrics_enabled = true

  # Optionally, you can configure the DogStatsD instance used for sending runtime metrics.
  # DogStatsD is automatically configured with default settings if `dogstatsd-ruby` is available.
  # You can configure with host and port of Datadog agent; defaults to 'localhost:8125'.
  c.runtime_metrics statsd: Datadog::Statsd.new
end
```

Runtime metrics can be viewed in correlation with your Ruby services. See the [Service page][3] in Datadog.

By default, runtime metrics from your application are sent to the Datadog Agent thanks to DogStatsD over port `8125`. Make sure that [DogStatsD is enabled for the Agent][2].
If you are running the Agent as a container, ensure that `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [is set to true][4], and that port `8125` is open on the Agent.
In Kubernetes, [bind the DogstatsD port to a host port][5]; in ECS, [set the appropriate flags in your task definition][6].

[1]: https://rubygems.org/gems/dogstatsd-ruby
[2]: /developers/metrics/dogstatsd_metrics_submission/#setup
[3]: https://app.datadoghq.com/apm/service
[4]: /agent/docker/#dogstatsd-custom-metrics
[5]: /agent/kubernetes/dogstatsd/#bind-the-dogstatsd-port-to-a-host-port
[6]: /integrations/amazon_ecs/?tab=python#create-an-ecs-task
{{% /tab %}}
{{% tab "Go" %}}

Coming Soon. Reach out to [the Datadog support team][1] to be part of the beta.

[1]: /help
{{% /tab %}}
{{% tab "Node.js" %}}

<div class="alert alert-warning">
This feature is currently in private beta. <a href="https://docs.datadoghq.com/help/">Reach out to support</a> to turn on this feature for your account.
</div>

Runtime metrics collection can be enabled with one configuration parameter in the tracing client either through the tracer option: `tracer.init({ runtimeMetrics: true })` or through the environment variable: `DD_RUNTIME_METRICS_ENABLED=true`

Runtime metrics can be viewed in correlation with your Node services. See the [Service page][1] in Datadog.

By default, runtime metrics from your application are sent to the Datadog Agent thanks to DogStatsD over port `8125`. Make sure that [DogStatsD is enabled for the Agent][2].
If you are running the Agent as a container, ensure that `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [is set to true][3], and that port `8125` is open on the Agent.
In Kubernetes, [bind the DogstatsD port to a host port][4]; in ECS, [set the appropriate flags in your task definition][5].

[1]: https://app.datadoghq.com/apm/services
[2]: /developers/metrics/dogstatsd_metrics_submission/#setup
[3]: /agent/docker/#dogstatsd-custom-metrics
[4]: /agent/kubernetes/dogstatsd/#bind-the-dogstatsd-port-to-a-host-port
[5]: /integrations/amazon_ecs/?tab=python#create-an-ecs-task
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

Additional JMX metrics can be added using configuration files that are passed on using `dd.jmxfetch.config.dir` and `dd.jmxfetch.config`. You can also enable existing Datadog JMX integrations individually with the `dd.jmxfetch.<INTEGRATION_NAME>.enabled=true` parameter. This auto-embeds configuration from Datadog's [existing JMX configuration files][2]. See the [JMX Integration][3] for further details on configuration.

[1]: https://app.datadoghq.com/dash/integration/256/jvm-runtime-metrics
[2]: https://github.com/DataDog/integrations-core/search?q=jmx_metrics&unscoped_q=jmx_metrics
[3]: /integrations/java/#configuration
{{% /tab %}}
{{% tab "Python" %}}

{{< get-metrics-from-git "python" >}}

Along with displaying these metrics in your APM Service Page, Datadog provides a [default Python Runtime Metrics Dashboard][1] with the `service` and `runtime-id` tags that are applied to these metrics.

[1]: https://app.datadoghq.com/dash/integration/30267/python-runtime-metrics
{{% /tab %}}
{{% tab "Ruby" %}}

The following metrics are collected by default after enabling Runtime metrics.

{{< get-metrics-from-git "ruby" >}}

Along with displaying these metrics in your APM Service Page, Datadog provides a [default Ruby Runtime Dashboard][1] with the `service` and `runtime-id` tags that are applied to these metrics.

[1]: https://app.datadoghq.com/dash/integration/30268/ruby-runtime-metrics
{{% /tab %}}
{{% tab "Go" %}}

Coming Soon. Reach out to [the Datadog support team][1] to be part of the beta.

[1]: /help
{{% /tab %}}
{{% tab "Node.js" %}}

The following metrics are collected by default after enabling runtime metrics.

{{< get-metrics-from-git "node" >}}

Along with displaying these metrics in your APM Service Page, Datadog provides a [default Node Runtime Dashboard][1] with the `service` and `runtime-id` tags that are applied to these metrics.

[1]: https://app.datadoghq.com/dash/integration/30269/node-runtime-metrics
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

[1]: /tracing/visualization/#services
