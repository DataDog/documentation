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
Datadog supports a variety of open standards, including [OpenTracing][1] and [OpenTelemetry][2]. Each of the following languages has support for sending Open Tracing data to Datadog. They all also have support for sending OpenTelemetry data to Datadog via the [OpenTelemetry Collector Datadog exporter](#opentelemetry-collector-datadog-exporter). Additionally, Python, Ruby, and NodeJS have dedicated OpenTelemetry Datadog span exporters, which export traces from OpenTelemetry tracing clients to a Datadog Agent. 

Click your language to see instructions for setting up OpenTracing or language-specific OpenTelemetry exporters. See below for setting up the [OpenTelemetry Collector Datadog exporter](#opentelemetry-collector-datadog-exporter):

{{< partial name="apm/apm-opentracing.html" >}}

<br>

## OpenTelemetry Collector Datadog exporter

The OpenTelemetry Collector is a vendor-agnostic separate agent process for collecting and exporting telemetry data emitted by many processes. Datadog has [an exporter available within the OpenTelemetry Collector][3] to receive traces and metrics data from the OpenTelemetry SDKs, and to forward the data on to Datadog (without the Datadog Agent). It works with all supported languages. 

You can [deploy the OpenTelemetry Collector via any of the supported methods][4], and configure it by adding a `datadog` exporter to your [OpenTelemetry configuration YAML file][5] along with your [Datadog API key][6]:

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

On each OpenTelemetry-instrumented application, set the resource attributes `development.environment`, `service.name`, and `service.version` using [the language's SDK][2]. As a fall-back, you can also configure hostname (optionally), environment, service name, and service version at the collector level for unified service tagging by following the [example configuration file][7]. If you don't specify the hostname explicitly, the exporter attempts to get an automatic default by checking the following sources in order, falling back to the next one if the current one is unavailable or invalid:

<!--- 1. Hostname set by another OpenTelemetry component -->
1. Manually set hostname in configuration
1. EC2 non-default hostname (if in EC2 instance)
1. EC2 instance id (if in EC2 instance)
1. Fully qualified domain name
1. Operating system host name

### Ingesting OpenTelemetry Traces with the Collector

The OpenTelemetry Collector is configured by adding a [pipeline][8] to your `otel-collector-configuration.yml` file. Supply the relative path to this configuration file when you start the collector by passing it in via the `--config=<path/to/configuration_file>` command line argument. For examples of supplying a configuration file, see the [OpenTelemetry Collector documentation][9].

The exporter assumes you have a pipeline that uses the `datadog` exporter, and includes a [batch processor][10] configured with the following:
  - A required `timeout` setting of `10s` (10 seconds). A batch representing 10 seconds of traces is a constraint of Datadog's API Intake for Trace Related Statistics. 
  <div class="alert alert-info"><strong>Important!</strong> Without this <code>timeout</code> setting, trace related metrics including <code>.hits</code>, <code>.errors</code>, and <code>.duration</code> for different services and service resources will be inaccurate over periods of time.</div>

<div class="alert alert-warning">
The Datadog exporter for the OpenTelemetry Collector is currently in beta. It may consume high CPU and memory resources. Configuring particularly the pipeline and batch processor may take some iteration before it responds with accurate metrics given your production environment. <a href="https://docs.datadoghq.com/help/">Reach out to support</a> if it doesn't work as you expect.
</div>

Here is an example trace pipeline configured with an `otlp` receiver, `batch` processor, and `datadog` exporter:

```
receivers:
  otlp:

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
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog/api]
```

To see more information and additional examples of how you might configure your collector, see [the OpenTelemetry Collector configuration documentation][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentracing.io/docs/
[2]: https://opentelemetry.io/docs/
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/master/exporter/datadogexporter
[4]: https://opentelemetry.io/docs/collector/getting-started/#deployment
[5]: https://opentelemetry.io/docs/collector/configuration/
[6]: https://app.datadoghq.com/account/settings#api
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/master/exporter/datadogexporter/example/config.yaml
[8]: https://github.com/open-telemetry/opentelemetry-collector/blob/master/docs/design.md#pipelines
[9]: https://github.com/open-telemetry/opentelemetry-collector/tree/master/examples
[10]: https://github.com/open-telemetry/opentelemetry-collector/tree/master/processor/batchprocessor#batch-processor
