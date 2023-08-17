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
  Datadog connector for the OpenTelemetry Collector is in beta. 
{{< /callout >}} 

## Overview

If you use the soon-to-be deprecated [Datadog Processor][1] in your OpenTelemetry Collector pipeline for APM metrics, switch to use [Datadog Connector][2] instead.

## Advantages of Datadog Connector

The Datadog Connector for the OpenTelemetry Collector allows APM metrics to be calculated on 100% of the trace data, even when sampling is applied. Sampling is a technique that takes a subset of data to filter a percentage of the total data, which can reduce the overall costs of data transmission and storage.

The Datadog Processor has to convert trace data to metrics data to retain APM stats in case the traces sent through the pipeline are sampled. The Datadog Connector improves this necessary data transmission while complying better with the OpenTelemetry standard and still retaining the APM stats passed through it.

## Switch your Agent OpenTelemetry Collector configuration

To switch to using the Datadog Connector, change the following Agent configurations:

1. Add the `connectors` section:
{{< highlight yaml "hl_lines=7-14" >}}
processors:
   probabilistic_sampler:
     sampling_percentage: 20
     # Add the "datadog" processor definition
  datadog:

# Add this section
 connectors:
  # Add the Datadog Connector definition and further configurations
  datadog:
     exporters:
        datadog:
           api:
              key: ${env:DD_API_KEY}
{{< /highlight >}}

2. Duplicate the `service.pipelines.trace` configuration for the sampled trace pipeline.
3. Add the Datadog Connector to the duplicated pipeline configuration that isn't sampled:
     {{< highlight yaml "hl_lines=3-6" >}}
     service:
       pipelines:
         traces:
           receivers: [otlp]
           processors: [batch]
           exporters: [datadog/connector]
         traces/2: # This duplicated pipeline uses sampling
           receivers: [otlp]
           processors: [batch, probabilistic_sampler]
           exporters: [datadog]
     {{< /highlight >}}
4. Add the Connector configuration to `metrics` section:
   ```yaml
       metrics:
         receivers: [datadog/connector]
         processors: [batch]
         exporters: [datadog]
   ```

### Example

Here's a full example with all of the new configuration:

```yaml
processors:
  probabilistic_sampler:
    sampling_percentage: 20

 connectors:
  # Add the "datadog" connector definition and further configurations
   datadog:

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
        receivers: [otlp]
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


