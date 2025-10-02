---
title: OTLP Ingestion by the Datadog Agent
description: Ingest OTLP trace data through the Datadog Agent
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Send OpenTelemetry Data to Datadog > OTLP
  Ingestion by the Datadog Agent
sourceUrl: >-
  https://docs.datadoghq.com/opentelemetry/setup/otlp_ingest_in_the_agent/index.html
---

# OTLP Ingestion by the Datadog Agent

OTLP Ingest in the Agent is a way to send telemetry data directly from applications instrumented with [OpenTelemetry SDKs](https://opentelemetry.io/docs/instrumentation/) to Datadog Agent. Since versions 6.32.0 and 7.32.0, the Datadog Agent can ingest OTLP traces and [OTLP metrics](https://docs.datadoghq.com/metrics/open_telemetry/otlp_metric_types/) through gRPC or HTTP. Since versions 6.48.0 and 7.48.0, the Datadog Agent can ingest OTLP logs through gRPC or HTTP.

OTLP Ingest in the Agent allows you to use observability features in the Datadog Agent. Data from applications instrumented with OpenTelemetry SDK cannot be used in some Datadog proprietary products, such as App and API Protection, Continuous Profiler, and Ingestion Rules. [OpenTelemetry Runtime Metrics are supported for some languages](https://docs.datadoghq.com/opentelemetry/runtime_metrics/).

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/setup/dd-agent-otlp-ingest.5c618e65990e9be5954c60e908ab5f09.png?auto=format"
   alt="Diagram: OpenTelemetry SDK sends data through OTLP protocol to a Collector with Datadog Exporter, which forwards to Datadog's platform." /%}

{% alert level="info" %}
To see which Datadog features are supported with this setup, see the [feature compatibility table](https://docs.datadoghq.com/opentelemetry/compatibility/) under OTel to Datadog Agent (OTLP).
{% /alert %}

## Initial setup{% #initial-setup %}

To get started, you first [instrument your application](https://opentelemetry.io/docs/concepts/instrumenting/) with OpenTelemetry SDKs. Then, export the telemetry data in OTLP format to the Datadog Agent. Configuring this varies depending on the kind of infrastructure your service is deployed on, as described on the page below. Although the aim is to be compatible with the latest OTLP version, the OTLP Ingest in the Agent is not compatible with all OTLP versions. The versions of OTLP that are compatible with the Datadog Agent are those that are also supported by the OTLP receiver in the OpenTelemetry Collector. To verify the exact versions supported, check the `go.opentelemetry.io/collector` version in the Agent `go.mod` file.

Read the OpenTelemetry instrumentation documentation to understand how to point your instrumentation to the Agent. The `receiver` section described below follows the [OpenTelemetry Collector OTLP receiver configuration schema](https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/config.md).

{% alert level="warning" %}
**Note**: The supported setup is an ingesting Agent deployed on every OpenTelemetry-data generating host. You cannot send OpenTelemetry telemetry from collectors or instrumented apps running one host to an Agent on a different host. But, provided the Agent is local to the collector or SDK instrumented app, you can set up multiple pipelines.
{% /alert %}

## Enabling OTLP Ingestion on the Datadog Agent{% #enabling-otlp-ingestion-on-the-datadog-agent %}

{% tab title="Host" %}
OTLP ingestion is off by default, and you can turn it on by updating your `datadog.yaml` file configuration or by setting environment variables. The following `datadog.yaml` configurations enable endpoints on the default ports.

{% alert level="warning" %}
The following examples use `0.0.0.0` as the endpoint address for convenience. This allows connections from any network interface. For enhanced security, especially in local deployments, consider using `localhost` instead. For more information on secure endpoint configuration, see the [OpenTelemetry security documentation](https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/security-best-practices.md#safeguards-against-denial-of-service-attacks).
{% /alert %}

For gRPC, default port 4317:

```yaml
otlp_config:
  receiver:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
```

For HTTP, default port 4318:

```yaml
otlp_config:
  receiver:
    protocols:
      http:
        endpoint: 0.0.0.0:4318
```

Alternatively, configure the endpoints by providing the port through the environment variables:

- For gRPC (`localhost:4317`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT`
- For HTTP (`localhost:4318`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT`

These must be passed to both the core Agent and trace Agent processes. If running in a containerized environment, use `0.0.0.0` instead of `localhost` to ensure the server is available on non-local interfaces.

Configure either gRPC or HTTP for this feature. Here is [an example application that shows configuration for both](https://gist.github.com/gbbr/4a54dd02d34ad05e694952e0a02e1c67).

OTLP logs ingestion on the Datadog Agent is disabled by default so that you don't have unexpected logs product usage that may impact billing. To enable OTLP logs ingestion:

1. Explicitly enable log collection as a whole by following [Host Agent Log collection setup](https://docs.datadoghq.com/agent/logs/):

   ```yaml
   logs_enabled: true
   ```

1. Set `otlp_config.logs.enabled` to true:

   ```yaml
   otlp_config:
     logs:
       enabled: true
   ```

{% /tab %}

{% tab title="Docker" %}

1. Follow the [Datadog Docker Agent setup](https://docs.datadoghq.com/agent/docker/).

1. For the Datadog Agent container, set the following endpoint environment variables and expose the corresponding port:

   - For gRPC: Set `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` to `0.0.0.0:4317` and expose port `4317`.
   - For HTTP: Set `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` to `0.0.0.0:4318` and expose port `4318`.

1. If you want to enable OTLP logs ingestion, set the following endpoint environment variables in the Datadog Agent container:

   - Set `DD_LOGS_ENABLED` to true.
   - Set `DD_OTLP_CONFIG_LOGS_ENABLED` to true.

{% alert level="warning" %}
**Known Issue**: Starting with Agent version 7.61.0, OTLP ingestion pipelines may fail to start in Docker environments, displaying the error: `Error running the OTLP ingest pipeline: failed to register process metrics: process does not exist`.If you are using an affected version, you can use one of these workarounds:1. Set the environment variable `HOST_PROC` to `/proc` in your Agent Docker container.2. Remove `/proc/:/host/proc/:ro` from `volumes` in your Agent Docker container.3. Set `pid` to `host` in your Agent Docker container.These configurations can be applied through either the `docker` command or Docker compose file.
{% /alert %}

{% /tab %}

{% tab title="Kubernetes (Daemonset)" %}

1. Follow the [Kubernetes Agent setup](https://docs.datadoghq.com/agent/kubernetes/?tab=daemonset).

1. Configure the following environment variables in both the trace Agent container and the core Agent container:

For gRPC:

   ```
   name: DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT # enables gRPC receiver on port 4317
   value: "0.0.0.0:4317"
   ```

For HTTP:

   ```
   name: DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT # enables HTTP receiver on port 4318
   value: "0.0.0.0:4318"
   ```

1. Map the container ports 4317 or 4318 to the host port for the core Agent container:

For gRPC:

   ```
   ports:
     - containerPort: 4317
       hostPort: 4317
       name: traceportgrpc
       protocol: TCP
   ```

For HTTP

   ```
   ports:
     - containerPort: 4318
       hostPort: 4318
       name: traceporthttp
       protocol: TCP
   ```

1. If you want to enable OTLP logs ingestion, set the following endpoint environment variables in the core Agent container:

Enable [log collection with your DaemonSet](https://docs.datadoghq.com/containers/guide/kubernetes_daemonset/#log-collection):

   ```
   name: DD_LOGS_ENABLED
   value: "true"
   ```

And enable OTLP logs ingestion:

   ```
   name: DD_OTLP_CONFIG_LOGS_ENABLED
   value: "true"
   ```

{% /tab %}

{% tab title="Kubernetes (Helm) - values.yaml" %}

1. Follow the [Kubernetes Agent setup](https://docs.datadoghq.com/agent/kubernetes/?tab=helm).

1. Enable the OTLP endpoints in the Agent by editing the `datadog.otlp` section of the `values.yaml` file:

For gRPC:

   ```
   otlp:
    receiver:
      protocols:
        grpc:
          endpoint: 0.0.0.0:4317
          enabled: true
   ```

For HTTP:

   ```
   otlp:
    receiver:
      protocols:
        http:
          endpoint: 0.0.0.0:4318
          enabled: true
   ```

This enables each protocol in the default port (`4317` for OTLP/gRPC and `4318` for OTLP/HTTP).
{% /tab %}

{% tab title="Kubernetes (Helm) - set" %}

1. Follow the [Kubernetes Agent setup](https://docs.datadoghq.com/agent/kubernetes/?tab=helm).

1. Enable the preferred protocol:

For gRPC:

   ```
   --set "datadog.otlp.receiver.protocols.grpc.enabled=true"
   ```

For HTTP:

   ```
   --set "datadog.otlp.receiver.protocols.http.enabled=true"
   ```

This enables each protocol in the default port (`4317` for OTLP/gRPC and `4318` for OTLP/HTTP).
{% /tab %}

{% tab title="Kubernetes (Operator)" %}

1. Follow the [Kubernetes Agent setup](https://docs.datadoghq.com/agent/kubernetes/?tab=helm).

1. Enable the preferred protocol in your Operator's manifest:

For gRPC:

   ```yaml
   features:
     otlp:
       receiver:
         protocols:
           grpc:
             enabled: true
   ```

For HTTP:

   ```yaml
   features:
     otlp:
       receiver:
         protocols:
           http:
             enabled: true
   ```

This enables each protocol in the default port (`4317` for OTLP/gRPC and `4318` for OTLP/HTTP).
{% /tab %}

{% tab title="AWS Lambda" %}
For detailed instructions on using OpenTelemetry with AWS Lambda and Datadog, including:

- Instrumenting your Lambda functions with OpenTelemetry
- Using OpenTelemetry API support within Datadog tracers
- Sending OpenTelemetry traces to the Datadog Lambda Extension

See the Serverless documentation for [AWS Lambda and OpenTelemetry](https://docs.datadoghq.com/serverless/aws_lambda/opentelemetry/).
{% /tab %}

There are many other environment variables and settings supported in the Datadog Agent. To get an overview of them all, see [the configuration template](https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml).

## Sending OpenTelemetry traces, metrics, and logs to Datadog Agent{% #sending-opentelemetry-traces-metrics-and-logs-to-datadog-agent %}

{% tab title="Docker" %}

1. For the application container, set `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable to point to the Datadog Agent container. For example:

   ```
   OTEL_EXPORTER_OTLP_ENDPOINT=http://<datadog-agent>:4318
   ```

1. Both containers must be defined in the same bridge network, which is handled automatically if you use Docker Compose. Otherwise, follow the Docker example in [Tracing Docker Applications](https://docs.datadoghq.com/agent/docker/apm/#docker-network) to set up a bridge network with the correct ports.

{% /tab %}

{% tab title="Kubernetes" %}
In the application deployment file, configure the endpoint that the OpenTelemetry client sends traces to with the `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable.

For gRPC:

```yaml
env:
 - name: HOST_IP
   valueFrom:
     fieldRef:
       fieldPath: status.hostIP
 - name: OTEL_EXPORTER_OTLP_ENDPOINT
   value: "http://$(HOST_IP):4317" # sends to gRPC receiver on port 4317
```

For HTTP:

```yaml
env:
 - name: HOST_IP
   valueFrom:
     fieldRef:
       fieldPath: status.hostIP
 - name: OTEL_EXPORTER_OTLP_ENDPOINT
   value: "http://$(HOST_IP):4318" # sends to HTTP receiver on port 4318
```

**Note**: To enrich container tags for custom metrics, set the appropriate resource attributes in the application code where your OTLP metrics are generated. For example, set the `container.id` resource attribute to the pod's UID.
{% /tab %}

{% alert level="info" %}
When configuring the endpoint for sending traces, ensure you use the correct path required by your OTLP library. Some libraries expect traces to be sent to the `/v1/traces` path, while others use the root path `/`.
{% /alert %}

## Further reading{% #further-reading %}

- [OTLP ingestion in the Agent](https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-opentelemetry-protocol-support/)
- [OTLP Metrics Types](https://docs.datadoghq.com/metrics/open_telemetry/otlp_metric_types)
- [OpenTelemetry Runtime Metrics](https://docs.datadoghq.com/opentelemetry/runtime_metrics/)
