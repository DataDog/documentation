---
title: OTLP Ingestion by the Datadog Agent
kind: documentation
aliases:
  - /tracing/setup_overview/open_standards/otlp_ingest_in_the_agent/
  - /tracing/trace_collection/open_standards/otlp_ingest_in_the_agent/
description: 'Ingest OTLP trace data through the Datadog Agent'
further_reading:
- link: "https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-opentelemetry-protocol-support/"
  tag: "Blog"
  text: "OTLP ingestion in the Agent"
---


OTLP Ingest in the Agent is a way to send telemetry data directly from applications instrumented with [OpenTelemetry SDKs][1] to Datadog Agent. Since versions 6.32.0 and 7.32.0, the Datadog Agent can ingest OTLP traces and [OTLP metrics][2] through gRPC or HTTP.

OTLP Ingest in the Agent allows you to use observability features in the Datadog Agent. Because the application is instrumented with OpenTelemetry SDK, some Datadog Library specific features aren't available for the ingested data including Application Security Management, Continuous Profiler, Runtime Metrics, and Ingestion Rules.

To get started, you first [instrument your application][3] with OpenTelemetry SDKs. Then, export the telemetry data in OTLP format to the Datadog Agent. Configuring this varies depending on the kind of infrastructure your service is deployed on, as described on the page below.

Read the OpenTelemetry instrumentation documentation to understand how to point your instrumentation to the Agent. The `receiver` section described below follows the [OpenTelemetry Collector OTLP receiver configuration schema][4].

{{< img src="metrics/otel/otlp_ingestion_update.png" alt="OTel SDKs/Libraries, Datadog Trace Library, Datadog Integrations -> Datadog Agent -> Datadog" style="width:100%;">}}

<div class="alert alert-warning"><strong>Note</strong>: The supported setup is an ingesting Agent deployed on every OTel-data generating host. You cannot send OTel telemetry from collectors or instrumented apps running one host to an Agent on a different host. But, provided the Agent is local to the collector or SDK instrumented app, you can set up multiple pipelines.</div>

## Enabling OTLP Ingestion on the Datadog Agent

{{< tabs >}}
{{% tab "Host" %}}

OTLP ingestion is off by default, and you can turn it on by updating your `datadog.yaml` file configuration or by setting environment variables. The following `datadog.yaml` configurations enable endpoints on the default ports. 

For gRPC, default port 4317:

```yaml
otlp_config:
  receiver:
    protocols:
      grpc:
        endpoint: localhost:4317
```
For HTTP, default port 4318:

```yaml
otlp_config:
  receiver:
    protocols:
      http:
        endpoint: localhost:4318
```

Alternatively, configure the endpoints by providing the port through the environment variables:

- For gRPC (`localhost:4317`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` 
- For HTTP (`localhost:4318`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT`

These must be passed to both the core Agent and trace Agent processes. If running in a containerized environment, use `0.0.0.0` instead of `localhost` to ensure the server is available on non-local interfaces.

Configure either gRPC or HTTP for this feature. Here is [an example application that shows configuration for both][1].

[1]: https://gist.github.com/gbbr/4a54dd02d34ad05e694952e0a02e1c67
{{% /tab %}}
{{% tab "Docker" %}}

1. Follow the [Datadog Docker Agent setup][1]. 
  
2. For the Datadog Agent container, set the following endpoint environment variables and expose the corresponding port: 
   - For gPRC: Set `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` to `0.0.0.0:4317` and expose port `4317`.
   - For HTTP: Set `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` to `0.0.0.0:4318` and expose port `4318`.

[1]: /agent/docker/
{{% /tab %}}
{{% tab "Kubernetes (Daemonset)" %}}

1. Follow the [Kubernetes Agent setup][1].

2. Configure the following environment variables in both the trace Agent container and the core Agent container:
   
   For gPRC:
   ```
   name: DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT # enables gRPC receiver on port 4317
   value: "0.0.0.0:4317"
   ```

   For HTTP:
   ```
   name: DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT # enables HTTP receiver on port 4318
   value: "0.0.0.0:4318"
   ```
3. Map the container ports 4317 or 4318 to the host port for the core Agent container:

   For gPRC:
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

[1]: /agent/kubernetes/?tab=daemonset
{{% /tab %}}

{{% tab "Kubernetes (Helm) - values.yaml" %}}

1. Follow the [Kubernetes Agent setup][1].

2. Enable the OTLP endpoints in the Agent by editing the `datadog.otlp` section of the `values.yaml` file:

   For gRPC:
   ```
   otlp:
    receiver:
      protocols:
        grpc:
          enabled: true
   ```
   
   For HTTP:
   ```
   otlp:
    receiver:
      protocols:
        http:
          enabled: true
   ```

This enables each protocol in the default port (`4317` for OTLP/gRPC and `4318` for OTLP/HTTP).


[1]: /agent/kubernetes/?tab=helm
{{% /tab %}}

{{% tab "Kubernetes (Helm) - set" %}}

1. Follow the [Kubernetes Agent setup][1].

2. Enable the preferred protocol:

   For gRPC:
   ```
   --set "datadog.otlp.receiver.protocols.grpc.enabled=true"
   ```
   For HTTP:
   ```
   --set "datadog.otlp.receiver.protocols.http.enabled=true"
   ```

This enables each protocol in the default port (`4317` for OTLP/gRPC and `4318` for OTLP/HTTP).

[1]: /agent/kubernetes/?tab=helm
{{% /tab %}}
{{< /tabs >}}

There are many other environment variables and settings supported in the Datadog Agent. To get an overview of them all, see [the configuration template][5].

## Sending OTLP traces from the application to Datadog Agent

{{< tabs >}}
{{% tab "Docker" %}}
1. For the application container, set `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable to point to the Datadog Agent container. For example:

   ```
   OTEL_EXPORTER_OTLP_ENDPOINT=http://<datadog-agent>:4318.
   ```

2. Both containers must be defined in the same bridge network, which is handled automatically if you use Docker Compose. Otherwise, follow the Docker example in [Tracing Docker Applications][1] to set up a bridge network with the correct ports.

[1]: /agent/docker/apm/#docker-network
{{% /tab %}}

{{% tab "Kubernetes" %}}
1. In the application deployment file, configure the endpoint that the OpenTelemetry client sends traces to with the `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable:

   For gPRC:
   ```
   env:
    - name: HOST_IP
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
    - name: OTEL_EXPORTER_OTLP_ENDPOINT
      value: "http://$(HOST_IP):4317" # sends to gRPC receiver on port 4317
   ```

   For HTTP:
   ```
   env:
    - name: HOST_IP
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
    - name: OTEL_EXPORTER_OTLP_ENDPOINT
      value: "http://$(HOST_IP):4318" # sends to HTTP receiver on port 4318
   ```
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Check the documentation of your OTLP Library. Some of them must send traces to <code>/v1/traces</code> instead of the <code>/</code> root path.</div>


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/
[2]: /metrics/open_telemetry/otlp_metric_types/
[3]: https://opentelemetry.io/docs/concepts/instrumenting/
[4]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/config.md
[5]: https://github.com/DataDog/datadog-agent/blob/7.35.0/pkg/config/config_template.yaml
