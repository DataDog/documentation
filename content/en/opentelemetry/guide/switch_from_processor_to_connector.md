---
title: Switch from Datadog Processor to Datadog Connector for OpenTelemetry APM Metrics
kind: guide
is_beta: true
further_reading:
- link: "/opentelemetry/guide/ingestion_sampling_with_opentelemetry/"
  tag: "Documentation"
  text: "Ingestion Sampling with OpenTelemetry"
- link: "https://opentelemetry.io/docs/collector/build-connector/"
  tag: "OpenTelemetry"
  text: "Connectors in OpenTelemetry"
---

{{< callout url="" header="false" btn_hidden="true" >}}
  Datadog Connector for the OpenTelemetry Collector is in beta. 
{{< /callout >}} 

## Overview

If you use the soon-to-be deprecated [Datadog Processor][1] in your OpenTelemetry Collector pipeline for APM metrics, switch to use [Datadog Connector][2] instead. The Datadog Connector allows APM metrics to be calculated on 100% of the trace data, even when sampling is applied. The Connector is most relevant when you use sampling components like [tailsamplingprocessor][3] or [probabilisticsamplerprocessor][4] in one of your pipelines. 

The Datadog Connector also complies better with the OpenTelemetry standard than the Datadog Processor.

## Switch your Agent OpenTelemetry Collector configuration

To switch to using the Datadog Connector, change the following configuration in your Agent [OpenTelemetry Collector configuration][5].

1. Add the `connectors` section with the `datadog/connector` definition.
   ```yaml
    connectors:
     # Add the Datadog Connector definition and further configurations
       datadog/connector:
   ```  
2. Duplicate the `service.pipelines.traces` configuration so one can be sampled and the other can be used for APM stats.
3. Add the Datadog Connector configuration to the unsampled pipeline:
     {{< highlight yaml "hl_lines=3-6" >}}
     service:
       pipelines:
         traces:
           receivers: [otlp]
           processors: [batch]
           exporters: [datadog/connector]
         traces/2: # This pipeline uses sampling
           receivers: [datadog/connector]
           processors: [batch, probabilistic_sampler]
           exporters: [datadog]
     {{< /highlight >}}
4. Add the `datadog/connector` configuration to the `metrics` pipeline:
   ```yaml
       metrics:
         receivers: [datadog/connector]
         processors: [batch]
         exporters: [datadog]
   ```

### Example

The following example shows Datadog Connector configuration using `probabilisticsampler`.

There are two traces pipelines that ingest the same data. The `traces/2` pipeline samples the traces, and the `traces` pipeline doesn't.
- `traces/2` sends data to the Datadog backend for you to see the sampled subset of the total traces.
- `traces` sends data to the metrics pipeline for the APM stats. This shows how much data the application emits in traces.

```yaml
processors:
  probabilistic_sampler:
    sampling_percentage: 20

connectors:
  # Add the "datadog" connector definition and further configurations
   datadog/connector:

exporters:
  datadog:
      api:
        key: ${env:DD_API_KEY}

service:
  pipelines:
     traces:
        receivers: [otlp]
        processors: [batch]
        exporters: [datadog/connector]

     traces/2: # This pipeline uses sampling
        receivers: [datadog/connector]
        processors: [batch, probabilistic_sampler]
        exporters: [datadog]

     metrics:
        receivers: [datadog/connector]
        processors: [batch]
        exporters: [datadog]
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/datadogprocessor
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/tailsamplingprocessor#tail-sampling-processor
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/probabilisticsamplerprocessor
[5]: https://opentelemetry.io/docs/collector/configuration/

