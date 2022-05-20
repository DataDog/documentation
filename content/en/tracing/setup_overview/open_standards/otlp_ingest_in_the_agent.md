---
title: OTLP Trace Ingestion by the Datadog Agent
kind: documentation
description: 'Ingest OTLP trace data through the Datadog Agent'
further_reading:
- link: "https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-opentelemetry-protocol-support/"
  tag: "Blog"
  text: "OTLP ingestion in the Agent"
aliases:
---


OTLP Ingest in the Agent is a way to send telemetry data directly from applications instrumented with [OpenTelemetry SDKs][1] to Datadog Agent. Since versions 6.32.0 and 7.32.0, the Datadog Agent can ingest OTLP traces and [OTLP metrics][2] through gRPC or HTTP.

OTLP Ingest in the Agent allows you to use trace observability features in the Datadog Agent. Because the application is instrumented with OpenTelemetry SDK, some Datadog Tracing Library specific features aren't available for the ingested data including Application Security Monitoring, Continuous Profiler, Runtime Metrics, and Ingestion Rules.

<div class="alert alert-warning">OTLP Metrics ingestion is in beta and its behavior and configuration may change.</div>

To get started, you first [instrument your application][3] with OpenTelemetry SDKs. Then, export the telemetry data in OTLP format to the Datadog Agent. Configuring this varies depending on the kind of infrastructure your service is deployed on, as described on the page below.

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

<div class="alert alert-warning"><strong>Deprecation Notice</strong>: The use of the `experimental:` configuration listed below for configuring OTLP receiving in `datadog.yaml` and the corresponding environment variables `DD_OTLP_HTTP_PORT` and `DD_OTLP_GRPC_PORT` is now deprecated and will be removed in Agent version `7.37.0`.</div>

```yaml
experimental:
  otlp:
    receiver:
      protocols:
        grpc:
        http:
```

[1]: https://gist.github.com/gbbr/4a54dd02d34ad05e694952e0a02e1c67
{{% /tab %}}
{{% tab "Docker" %}}

1. Follow the [Datadog Docker Agent setup][1]. 
  
2. For the Datadog Agent container, set the following endpoint environment variables and expose the corresponding port: 
   - For gPRC: `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` and port `4317`
   - For HTTP: `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` and port `4318`

3. For the application container, set `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable to point to the Datadog Agent container. For example:

   ```
   OTEL_EXPORTER_OTLP_ENDPOINT=http://<datadog-agent>:4318.
   ```

4. Both containers must be defined in the same bridge network, which is handled automatically if you use Docker Compose. Otherwise, follow the Docker example in [Tracing Docker Applications][2] to set up a bridge network with the correct ports.


[1]: /agent/docker/
[2]: /agent/docker/apm/#docker-network
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

4. In the application deployment file, configure the endpoint that the OpenTelemetry client sends traces to with the `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable:

   For gPRC:
   ```
   env:
    - name: <DD_AGENT_HOST>
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
    - name: OTEL_EXPORTER_OTLP_ENDPOINT
      value: "http://$<DD_AGENT_HOST>:4317" # sends to gRPC receiver on port 4317
   ```

   For HTTP:
   ```
   env:
    - name: <DD_AGENT_HOST>
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
    - name: OTEL_EXPORTER_OTLP_ENDPOINT
      value: "http://$<DD_AGENT_HOST>:4318" # sends to HTTP receiver on port 4318
   ```


[1]: /agent/kubernetes/?tab=daemonset
{{% /tab %}}
{{% tab "Kubernetes (Helm)" %}}

1. Follow the [Kubernetes Agent setup][1].

2. Set environment variables for the Agent. You can either use `set` commands:

   For gRPC:
   ```
   --set "datadog.env[0].name=DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT,datadog.env[0].value=0.0.0.0:4317"
   ```
   For HTTP:
   ```
   --set "datadog.env[0].name=DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT,datadog.env[0].value=0.0.0.0:4318"
   ```

   Or set them in the `datadog.env` parameter of the `values.yaml` file:

   For gRPC:
   ```
   env
     - name: DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT
       value: "0.0.0.0:4317"
   ```
   
   For HTTP:
   ```
   env: 
     - name: DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT
       value: "0.0.0.0:4318"
   ```

3. Map the container ports (`4317` for gRPC or `4318` for HTTP) to the host port for the core Agent container. You can either use `set` commands:

   For gRPC:
   ```
   --set 'agents.containers.agent.ports[0].containerPort=4317,agents.containers.agent.ports[0].hostPort=4317,agents.containers.agent.ports[0].name=traceportgrpc,agents.containers.agent.ports[0].protocol=TCP' 
   ```
   For HTTP:
   ```
   --set 'agents.containers.agent.ports[0].containerPort=4318,agents.containers.agent.ports[0].hostPort=4318,agents.containers.agent.ports[0].name=traceporthttp,agents.containers.agent.ports[0].protocol=TCP'
   ```

   Or set them in the `agents.containers.agent.ports` parameter of the `values.yaml` file:

   For gRPC:
   ```
     ports: 
       - containerPort: 4317
         hostPort: 4317
         name: traceportgrpc
         protocol: TCP
   ```

   For HTTP:
   ```
     ports: 
       - containerPort: 4318
         hostPort: 4318
         name: traceporthttp
         protocol: TCP
   ```

4. In the application deployment file, configure the endpoint that the OpenTelemetry client sends traces to with the `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable:

   For gPRC:
   ```
   env:
    - name: <DD_AGENT_HOST>
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
    - name: OTEL_EXPORTER_OTLP_ENDPOINT
      value: "http://$<DD_AGENT_HOST>:4317" # sends to gRPC receiver on port 4317
   ```

   For HTTP:
   ```
   env:
    - name: <DD_AGENT_HOST>
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
    - name: OTEL_EXPORTER_OTLP_ENDPOINT
      value: "http://$<DD_AGENT_HOST>:4318" # sends to HTTP receiver on port 4318
   ```


[1]: /agent/kubernetes/?tab=helm
{{% /tab %}}
{{< /tabs >}}

There are many other environment variables and settings supported in the Datadog Agent. To get an overview of them all, see [the configuration template][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/
[2]: /metrics/otlp/
[3]: https://opentelemetry.io/docs/concepts/instrumenting/
[4]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/config.md
[5]: https://github.com/DataDog/datadog-agent/blob/7.35.0/pkg/config/config_template.yaml
