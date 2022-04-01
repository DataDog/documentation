---
title: OTLP Trace Ingestion by the Datadog Agent
kind: documentation
description: 'Ingest OTLP trace data through the Datadog Agent'
further_reading:
aliases:
---


OTLP Ingest in the Agent is a way to send telemetry data directly from [OpenTelemetry SDKs][1] to Datadog Agent. Since versions 6.32.0 and 7.32.0, the Datadog Agent can ingest OTLP traces and [OTLP metrics][2] through both gRPC and HTTP.

<div class="alert alert-warning">OpenTelemetry Metrics ingestion is in beta and its behavior and configuration may change.</div>

To get started, you first [instrument your application][3] with OpenTelemetry SDKs. Then, export the telemetry data in OTLP format to the Datadog Agent. Configuring this varies depending on the kind of infrastructure your service is deployed on, as described on this below. 

Read the OpenTelemetry instrumentation documentation to understand how to point your instrumentation to the Agent. The `receiver` section described below follows the [OpenTelemetry Collector OTLP receiver configuration schema][4].


{{< tabs >}}
{{% tab "Host" %}}

OTLP ingestion is off by default, and you can turn it on by updating your `datadog.yaml` file configuration or by setting environment variables. The following `datadog.yaml` configurations enable endpoints on the default ports. 

For gRPC, default port 4317:

```yaml
otlp_config:
  receiver:
    protocols:
      grpc:
```
For HTTP, default port 4318:

```yaml
otlp_config:
  receiver:
    protocols:
      http:
```

Alternatively, configure the endpoints by providing the port through the environment variables:

- For gRPC (`0.0.0.0:4317`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` 
- For HTTP (`0.0.0.0:4318`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT`

These must be passed to both the core Agent and trace Agent if they are running in separate containers.

Configure either gRPC or HTTP for this feature. Here is [an example application that shows configuration for both][1].

<div class="alert alert-warning"><strong>Deprecation Notice</strong>: The use of `experimental:` for configuring OTLP receiving in `datadog.yaml` and the corresponding environment variables `DD_OTLP_HTTP_PORT` and `DD_OTLP_GRPC_PORT` is now deprecated and will be removed in Agent version `7.37.0`.</div>



[1]: https://gist.github.com/gbbr/4a54dd02d34ad05e694952e0a02e1c67
{{% /tab %}}
{{% tab "Docker" %}}


{{% /tab %}}
{{% tab "Kubernetes (Daemonset)" %}}


{{% /tab %}}
{{% tab "Kubernetes (Helm)" %}}


{{% /tab %}}
{{< /tabs >}}


[1]: https://opentelemetry.io/docs/instrumentation/
[2]: metrics/otlp/
[3]: https://opentelemetry.io/docs/concepts/instrumenting/
[4]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/config.md
