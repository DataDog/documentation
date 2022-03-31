---
title: OTLP Trace Ingestion by the Datadog Agent
kind: documentation
description: 'Ingest OTLP trace data through the Datadog Agent'
further_reading:
aliases:
---

<div class="alert alert-warning">OpenTelemetry Metrics is in beta and its behavior and configuration may change.</div>

The OTLP ingestion is configured through the `datadog.yaml` file. The following configuration enables the HTTP and gRPC endpoints on the default ports (4317 for gRPC and 4318 for HTTP):

```yaml
otlp_config:
  receiver:
    protocols:
      grpc:
      http:
```

The `receiver` section follows the [OpenTelemetry Collector OTLP receiver configuration schema][1]. You can also enable these with environment variables. For example, enable the gRPC endpoint by using the environment variable setting `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT=0.0.0.0:4317`. 

To view all settings and environment variables supported starting Datadog Agent 7.35.0, see the `otlp_config` section in [the configuration template][2]. 

Configuration settings must be passed to both the Core Agent and the Trace Agent if they are running in separate containers.

Check [the OpenTelemetry instrumentation documentation][3] to understand how to point your instrumentation to the Agent, and [contact Datadog support][4] to get more information on this feature and provide feedback.

[1]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/config.md
[2]: https://github.com/DataDog/datadog-agent/blob/7.35.0/pkg/config/config_template.yaml#L2911-L3054
[3]: https://opentelemetry.io/docs/instrumentation/
[4]: https://docs.datadoghq.com/help/
