---
title: OpenTracing and OpenTelemetry
kind: documentation
description: 'Use open standards to generate your application traces'
further_reading:
- link: "https://opentelemetry.io/docs/collector/"
  tag: "OpenTelemetry"
  text: "Collector documentation"
- link: "https://www.datadoghq.com/blog/opentelemetry-instrumentation/"
  tag: "Blog"
  text: "Datadog's partnership with OpenTelemetry"
aliases:


---
Datadog supports a variety of open standards, including [OpenTracing][1] and [OpenTelemetry][2]. Each of the following languages has support for sending Open Tracing data to Datadog. Python, Ruby, and Go also have OpenTelemetry Datadog span exporters, which export traces from OpenTelemetry to the Datadog Agent. 

Click your language to see instructions for setting these up:

{{< partial name="apm/apm-opentracing.html" >}}

<br>

## OpenTelemetry Collector

Alternatively, Datadog has [an exporter that uses the OpenTelemetry Collector][3] to receive traces and metrics data from the OpenTelemetry SDKs, and to forward the data on to Datadog (without the Agent). It works with all supported languages, and you configure it by supplying the [Datadog API key][4]:

```
datadog:
  api:
    key: "<API key>"
```
To send the data to the Datadog EU site, also set the `site` parameter:
```
datadog:
  api:
    key: "<API key>"
    site: datadoghq.eu
```

On each OpenTelemetry-instrumented application, set the resource attributes `development.environment`, `service.name`, and `service.version` using the language's SDK. As a fall-back, you can also configure hostname (optionally), environment, service name, and service version at the collector level for unified service tagging by following the [example configuration file][5]. If you don't specify the hostname explicitly, the exporter attempts to get an automatic default by checking the following sources in order, falling back to the next one if the current one is unavailable or invalid:

<!--- 1. Hostname set by another OpenTelemetry component -->
1. Manually set hostname in configuration
1. EC2 non-default hostname (if in EC2 instance)
1. EC2 instance id (if in EC2 instance)
1. Fully qualified domain name
1. Operating system host name

### Ingesting OpenTelemetry Traces with the Collector

The exporter assumes you have a pipeline that not only uses the exporter, but also includes a batch processor configured with the following:
  - A `timeout` setting of `10s` (10 seconds). A batch representing 10 seconds of traces is a constraint of Datadog's API Intake for Trace Related Statistics. Without this setting, trace related metrics including `.hits`, `.errors`, and `.duration` for different services and service resources may be inaccurate over periods of time.

<div class="alert alert-warning">
The Datadog exporter for the OpenTelemetry Collector is currently in beta. It may consume high CPU and memory resources. Configuring particularly the pipeline and batch processor may take some iteration before it responds with accurate metrics given your production environment. <a href="https://docs.datadoghq.com/help/">Reach out to support</a> if it doesn't work as you expect.
</div>

Here is an example pipeline:

```
receivers:
  examplereceiver:

processors:
  batch:
    timeout: 10s

exporters:
  datadog/api:
    hostname: customhostname
    env: prod
    service: myservice
    version: myversion

    tags:
      - example:tag

    api:
      key: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      site: datadoghq.eu

service:
  pipelines:
    traces:
      receivers: [examplereceiver]
      processors: [batch]
      exporters: [datadog/api]
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentracing.io/docs/
[2]: https://opentelemetry.io/docs/
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/master/exporter/datadogexporter
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/master/exporter/datadogexporter/example/config.yaml
