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

If you have a previously setup OpenTelemetry Collector pipeline that prepends the soon-to-be deprecated [Datadog processor][1] so that APM metrics are calculated from unsampled data, switch that pipeline to use the [Datadog connector][2] instead. 

The Datadog connector for the OpenTelemetry Collector allows APM metrics to be calculated on 100% of the trace data without any sampling, sets the appropriate retention for the metrics it passes through, and complies with the OpenTelemetry standard better than the Datadog Processor does.

## Switch your Agent OpenTelemetry Collector configuration

In your Agent configuration, find the `processors` section , which configure the processors for the pipeline. It looks something like this:

```yaml
processors:
  # ...
   probabilistic_sampler:
     sampling_percentage: 20
     # add the "datadog" processor definition
  datadog:
```

Remove the `datadog` processor, and add a `connectors` section with the `datadog` connector. The resulting configuration looks something like:

```yaml
processors:
  # ...
  probabilistic_sampler:
    sampling_percentage: 20
connectors:
  # add the "datadog" connector definition and further configurations
  datadog:
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/datadogprocessor
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector


