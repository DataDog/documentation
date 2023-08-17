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

If you use the soon-to-be deprecated [Datadog Processor][1] in your OpenTelemetry Collector pipeline for APM metrics, switch to use the [Datadog Connector][2] instead. 

The Datadog Connector for the OpenTelemetry Collector allows APM metrics to be calculated on 100% of the trace data, even when sampling is applied. It also complies with the OpenTelemetry standard better than the Datadog Processor does.

## Switch your Agent OpenTelemetry Collector configuration

To switch to using the Datadog Connector, change the following Agent configurations:

1. Replace the Datadog Processor configuration from `processors` with the Datadog Connector configuration from `connectors`:
{{< highlight yaml "hl_lines=8-11" >}}
# Remove this section
processors:
   probabilistic_sampler:
     sampling_percentage: 20
     # add the "datadog" processor definition
  datadog:

# Add this section
 connectors:
  # Add the Datadog Connector definition and further configurations
  datadog:
{{< /highlight >}}

3. Duplicate the `service.pipelines.trace` configuration for the sampled trace pipeline.
4. Add the Datadog Connector to the pipeline that isn't sampled:
     {{< highlight yaml "hl_lines=6" >}}
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


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/datadogprocessor
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector


