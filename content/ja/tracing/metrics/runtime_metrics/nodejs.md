---
aliases:
- /ja/tracing/runtime_metrics/nodejs
code_lang: nodejs
code_lang_weight: 40
description: Gain additional insights into your Node.js application's performance
  with the runtime metrics associated to your traces.
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
kind: documentation
title: Node.js Runtime Metrics
type: multi-code-lang
---

<div class="alert alert-warning">
This feature is in public beta.
</div>

## Automatic configuration

Runtime metrics collection can be enabled with one configuration parameter in the tracing client either through the tracer option: `tracer.init({ runtimeMetrics: true })` or through the environment variable: `DD_RUNTIME_METRICS_ENABLED=true`


   {{< tabs >}}
{{% tab "Environment variables" %}}

```shell
export DD_RUNTIME_METRICS_ENABLED=true
export DD_ENV=prod
export DD_SERVICE=my-web-app
export DD_VERSION=1.0.3
```

{{% /tab %}}
{{% tab "In code" %}}

```js
const tracer = require('dd-trace').init({
  env: 'prod',
  service: 'my-web-app',
  version: '1.0.3',
  runtimeMetrics: true
})
```

{{% /tab %}}
{{< /tabs >}}

Runtime metrics can be viewed in correlation with your Node services. See the [Service Catalog][1] in Datadog.

By default, runtime metrics from your application are sent to the Datadog Agent with DogStatsD over port `8125`. Make sure that [DogStatsD is enabled for the Agent][2].
If you are running the Agent as a container, ensure that `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [is set to true][3], and that port `8125` is open on the Agent.
In Kubernetes, [bind the DogstatsD port to a host port][4]; in ECS, [set the appropriate flags in your task definition][5].

Alternatively, the Agent can ingest metrics with a Unix Domain Socket (UDS) as an alternative to UDP transport. For more information, read [DogStatsD over Unix Domain Socket][7].

## 収集データ

The following metrics are collected by default after enabling runtime metrics.

{{< get-metrics-from-git "node" >}}

Along with displaying these metrics in your APM Service Page, Datadog provides a [default Node Runtime Dashboard][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/#setup
[3]: /ja/agent/docker/#dogstatsd-custom-metrics
[4]: /ja/developers/dogstatsd/?tab=kubernetes#agent
[5]: /ja/agent/amazon_ecs/#create-an-ecs-task
[6]: https://app.datadoghq.com/dash/integration/30269/node-runtime-metrics
[7]: /ja/developers/dogstatsd/unix_socket/