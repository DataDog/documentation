---
title: Ruby Runtime Metrics
kind: documentation
description: "Gain additional insights into your Ruby application's performance with the runtime metrics associated to your traces."
aliases:
- /tracing/runtime_metrics/ruby
code_lang: ruby
type: multi-code-lang
code_lang_weight: 30
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

<div class="alert alert-warning">
This feature is in public beta.
</div>

## Automatic configuration

Runtime metrics collection uses the [`dogstatsd-ruby`][1] gem to send metrics via DogStatsD to the Agent. To collect runtime metrics, you must add this gem to your Ruby application, and make sure that [DogStatsD is enabled for the Agent][2].

Metrics collection is disabled by default. You can enable it by setting the `DD_RUNTIME_METRICS_ENABLED` environment variable to `true`, or by setting the following configuration in your Ruby application:

```ruby
# config/initializers/datadog.rb
require 'datadog/statsd'
require 'datadog' # Use 'ddtrace' if you're using v1.x

Datadog.configure do |c|
  # To enable runtime metrics collection, set `true`. Defaults to `false`
  # You can also set DD_RUNTIME_METRICS_ENABLED=true to configure this.
  c.runtime_metrics.enabled = true

  # Optionally, you can configure the DogStatsD instance used for sending runtime metrics.
  # DogStatsD is automatically configured with default settings if `dogstatsd-ruby` is available.
  # You can configure with host and port of Datadog agent; defaults to 'localhost:8125'.
  c.runtime_metrics.statsd = Datadog::Statsd.new
end
```

Runtime metrics can be viewed in correlation with your Ruby services. See the [Service page][3] in Datadog.

By default, runtime metrics from your application are sent to the Datadog Agent with DogStatsD over port `8125`. Make sure that [DogStatsD is enabled for the Agent][2].
If you are running the Agent as a container, ensure that `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [is set to true][4], and that port `8125` is open on the Agent.
In Kubernetes, [bind the DogstatsD port to a host port][5]; in ECS, [set the appropriate flags in your task definition][6].

Alternatively, the Agent can ingest metrics with a Unix Domain Socket (UDS) as an alternative to UDP transport. For more information, read [DogStatsD over Unix Domain Socket][8].

## Data Collected

The following metrics are collected by default after enabling Runtime metrics.

{{< get-metrics-from-git "ruby" >}}

Along with displaying these metrics in your APM Service Page, Datadog provides a [default Ruby Runtime Dashboard][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://rubygems.org/gems/dogstatsd-ruby
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/#setup
[3]: https://app.datadoghq.com/apm/service
[4]: /agent/docker/#dogstatsd-custom-metrics
[5]: /developers/dogstatsd/?tab=kubernetes#agent
[6]: /agent/amazon_ecs/#create-an-ecs-task
[7]: https://app.datadoghq.com/dash/integration/30268/ruby-runtime-metrics
[8]: /developers/dogstatsd/unix_socket/