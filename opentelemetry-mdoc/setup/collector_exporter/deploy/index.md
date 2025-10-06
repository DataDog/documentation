---
title: Deploy the OpenTelemetry Collector
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Send OpenTelemetry Data to Datadog > Install
  and Configure the OpenTelemetry Collector > Deploy the OpenTelemetry Collector
---

# Deploy the OpenTelemetry Collector

This page guides you through various deployment options for the OpenTelemetry Collector with the Datadog Exporter, allowing you to send traces, metrics, and logs to Datadog.

## Deploy the Collector{% #deploy-the-collector %}

The OpenTelemetry Collector can be deployed in various environments to suit different infrastructure needs. This section covers the following deployment options:

- On a host
- Docker
- Kubernetes

It's important to note that certain features and capabilities may vary depending on the deployment method. For a detailed overview of these differences, see the Deployment-based limitations.

Choose the deployment option that best fits your infrastructure and complete the following instructions.

### On a host{% #on-a-host %}

Run the Collector, specifying the configuration file using the `--config` parameter:

```shell
otelcontribcol_linux_amd64 --config collector.yaml
```

### Docker{% #docker %}

{% tab title="localhost" %}
To run the OpenTelemetry Collector as a Docker image and receive traces from the same host:

1. Choose a published Docker image such as [`otel/opentelemetry-collector-contrib`](https://hub.docker.com/r/otel/opentelemetry-collector-contrib/tags).

1. Determine which ports to open on your container so that OpenTelemetry traces are sent to the OpenTelemetry Collector. By default, traces are sent over gRPC on port 4317. If you don't use gRPC, use port 4318.

1. Run the container and expose the necessary port, using the `collector.yaml` file. For example, if you are using port 4317:

   ```
   $ docker run \
       -p 4317:4317 \
       --hostname $(hostname) \
       -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
       otel/opentelemetry-collector-contrib
   ```

{% /tab %}

{% tab title="Other containers" %}
To run the OpenTelemetry Collector as a Docker image and receive traces from other containers:

1. Create a Docker network:

   ```
   docker network create <NETWORK_NAME>
   ```

1. Run the OpenTelemetry Collector and application containers as part of the same network.

   ```
   # Run the OpenTelemetry Collector
   docker run -d --name opentelemetry-collector \
       --network <NETWORK_NAME> \
       --hostname $(hostname) \
       -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
       otel/opentelemetry-collector-contrib
   ```

When running the application container, ensure that the environment variable `OTEL_EXPORTER_OTLP_ENDPOINT` is configured to use the appropriate hostname for the OpenTelemetry Collector. In the example below, this is `opentelemetry-collector`.

   ```
   # Run the application container
   docker run -d --name app \
       --network <NETWORK_NAME> \
       --hostname $(hostname) \
       -e OTEL_EXPORTER_OTLP_ENDPOINT=http://opentelemetry-collector:4317 \
       company/app:latest
   ```

{% /tab %}

### Kubernetes{% #kubernetes %}

{% tab title="DaemonSet" %}
Using a DaemonSet is the most common and recommended way to configure OpenTelemetry collection in a Kubernetes environment. To deploy the OpenTelemetry Collector and Datadog Exporter in a Kubernetes infrastructure:

1. Use this [example configuration](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart), including the application configuration, to set up the OpenTelemetry Collector with the Datadog Exporter as a DaemonSet.

1. Ensure that essential ports for the DaemonSet are exposed and accessible to your application. The following configuration options [from the example](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33-L38) define these ports:

   ```yaml
   # ...
        ports:
        - containerPort: 4318 # default port for OpenTelemetry HTTP receiver.
          hostPort: 4318
        - containerPort: 4317 # default port for OpenTelemetry gRPC receiver.
          hostPort: 4317
        - containerPort: 8888  # Default endpoint for querying Collector observability metrics.
   # ...
   ```
Important alert (level: info): If your application doesn't require both HTTP and gRPC, remove unused ports from the configuration.
1. To collect valuable Kubernetes attributes, which are used for Datadog container tagging, report the Pod IP as a resource attribute, [as shown in the example](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L48-L57):

   ```yaml
   # ...
           env:
           - name: POD_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.podIP
           # The k8s.pod.ip is used to associate pods for k8sattributes
           - name: OTEL_RESOURCE_ATTRIBUTES
             value: "k8s.pod.ip=$(POD_IP)"
   # ...
   ```

This ensures that [Kubernetes Attributes Processor](https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sattributesprocessor#section-readme), which is used in [the config map](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml), is able to extract the necessary metadata to attach to traces. There are additional [roles](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/roles.yaml) that need to be set to allow access to this metadata. [The example](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart) is complete, ready to use, and has the correct roles set up.

1. Configure your [application container](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L21-L22) to use the correct OTLP endpoint hostname. Since the OpenTelemetry Collector runs as a DaemonSet, the current host needs to be targeted. Set your application container's `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable accordingly, as in the [example chart](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L32-L39):

   ```yaml
   # ...
           env:
           - name: HOST_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.hostIP
             # The application SDK must use this environment variable in order to successfully
             # connect to the DaemonSet's collector.
           - name: OTEL_EXPORTER_OTLP_ENDPOINT
             value: "http://$(HOST_IP):4318"
   # ...
   ```

1. Configure host metadata collection to ensure accurate host information. Set up your DaemonSet to collect and forward host metadata:

   ```yaml
   processors:
     resourcedetection:
       detectors: [system, env]
     k8sattributes:
       # existing k8sattributes config
     transform:
       trace_statements:
         - context: resource
           statements:
             - set(attributes["datadog.host.use_as_metadata"], true)
   ...
   service:
     pipelines:
       traces:
         receivers: [otlp]
         processors: [resourcedetection, k8sattributes, transform, batch]
         exporters: [datadog]
   ```

This configuration collects host metadata using the `resourcedetection` processor, adds Kubernetes metadata with the `k8sattributes` processor, and sets the `datadog.host.use_as_metadata` attribute to `true`. For more information, see [Mapping OpenTelemetry Semantic Conventions to Infrastructure List Host Information](http://localhost:1313/opentelemetry/schema_semantics/host_metadata/).
{% /tab %}

{% tab title="Gateway" %}
To deploy the OpenTelemetry Collector and Datadog Exporter in a Kubernetes Gateway deployment:

1. Use this [example configuration](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart), including the application configuration, to set up the OpenTelemetry Collector with the Datadog Exporter as a DaemonSet.

1. Ensure that essential ports for the DaemonSet are exposed and accessible to your application. The following configuration options [from the example](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33-L38) define these ports:

   ```yaml
   # ...
        ports:
        - containerPort: 4318 # default port for OpenTelemetry HTTP receiver.
          hostPort: 4318
        - containerPort: 4317 # default port for OpenTelemetry gRPC receiver.
          hostPort: 4317
        - containerPort: 8888  # Default endpoint for querying Collector observability metrics.
   # ...
   ```
Important alert (level: info): If your application doesn't require both HTTP and gRPC, remove unused ports from the configuration.
1. To collect valuable Kubernetes attributes, which are used for Datadog container tagging, report the Pod IP as a resource attribute, [as shown in the example](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L48-L57):

   ```yaml
   # ...
           env:
           - name: POD_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.podIP
           # The k8s.pod.ip is used to associate pods for k8sattributes
           - name: OTEL_RESOURCE_ATTRIBUTES
             value: "k8s.pod.ip=$(POD_IP)"
   # ...
   ```

This ensures that [Kubernetes Attributes Processor](https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sattributesprocessor#section-readme), which is used in [the config map](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml), is able to extract the necessary metadata to attach to traces. There are additional [roles](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/roles.yaml) that need to be set to allow access to this metadata. [The example](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart) is complete, ready to use, and has the correct roles set up.

1. Configure your [application container](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L21-L22) to use the correct OTLP endpoint hostname. Since the OpenTelemetry Collector runs as a DaemonSet, the current host needs to be targeted. Set your application container's `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable accordingly, as in the [example chart](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L32-L39):

   ```yaml
   # ...
           env:
           - name: HOST_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.hostIP
             # The application SDK must use this environment variable in order to successfully
             # connect to the DaemonSet's collector.
           - name: OTEL_EXPORTER_OTLP_ENDPOINT
             value: "http://$(HOST_IP):4318"
   # ...
   ```

1. Change the DaemonSet to include an [OTLP exporter](https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md#otlp-grpc-exporter) instead of the Datadog Exporter [currently in place](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L56-L59):

   ```yaml
   # ...
   exporters:
     otlp:
       endpoint: "<GATEWAY_HOSTNAME>:4317"
   # ...
   ```

1. Make sure that the service pipelines use this exporter, instead of the Datadog one that [is in place in the example](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L136-L148):

   ```yaml
   # ...
       service:
         pipelines:
           metrics:
             receivers: [hostmetrics, otlp]
             processors: [resourcedetection, k8sattributes, batch]
             exporters: [otlp]
           traces:
             receivers: [otlp]
             processors: [resourcedetection, k8sattributes, batch]
             exporters: [otlp]
   # ...
   ```

This ensures that each Agent forwards its data through the OTLP protocol to the Collector Gateway.

1. Replace `<GATEWAY_HOSTNAME>` with the address of your OpenTelemetry Collector Gateway.

1. Configure the [`k8sattributes` processor](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L69) to forward the Pod IP to the Gateway Collector so that it can obtain the metadata:

   ```yaml
   # ...
   k8sattributes:
     passthrough: true
   # ...
   ```

For more information about the `passthrough` option, read [its documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/k8sattributesprocessor#as-a-gateway).

1. Make sure that the Gateway Collector's configuration uses the same Datadog Exporter settings that have been replaced by the OTLP exporter in the Agents. For example (where `<DD_SITE>` is your site, ):

   ```yaml
   # ...
   exporters:
     datadog:
       api:
         site: <DD_SITE>
         key: ${env:DD_API_KEY}
   # ...
   ```

1. Configure host metadata collection: In a gateway deployment, you need to ensure that host metadata is collected by the agent collectors and preserved by the gateway collector. This ensures that host metadata is collected by the agents and properly forwarded through the gateway to Datadog.For more information, see [Mapping OpenTelemetry Semantic Conventions to Infrastructure List Host Information](http://localhost:1313/opentelemetry/schema_semantics/host_metadata/).

**Agent collector configuration**:

   ```yaml
   processors:
     resourcedetection:
       detectors: [system, env]
     k8sattributes:
       passthrough: true
   
   exporters:
     otlp:
       endpoint: "<GATEWAY_HOSTNAME>:4317"
   
   service:
     pipelines:
       traces:
         receivers: [otlp]
         processors: [resourcedetection, k8sattributes, transform, batch]
         exporters: [otlp]
   ```

**Gateway collector configuration**:

   ```yaml
   processors:
     k8sattributes:
       extract:
         metadata: [node.name, k8s.node.name]
   
   exporters:
     datadog:
       api:
         key: ${DD_API_KEY}
       hostname_source: resource_attribute
   
   service:
     pipelines:
       traces:
         receivers: [otlp]
         processors: [k8sattributes, batch]
         exporters: [datadog]
   ```

{% /tab %}

{% tab title="Operator" %}
To use the OpenTelemetry Operator, follow the [official documentation for deploying the OpenTelemetry Operator](https://github.com/open-telemetry/opentelemetry-operator#readme). As described there, deploy the certificate manager in addition to the Operator.

Configure the Operator using one of the OpenTelemetry Collector standard Kubernetes configurations:

- [DaemonSet deployment](http://localhost:1313/opentelemetry/collector_exporter/deployment/?tab=daemonset#kubernetes) - Use the DaemonSet deployment if you want to ensure you receive host metrics.
- [Gateway deployment](http://localhost:1313/opentelemetry/collector_exporter/deployment/?tab=gateway#kubernetes)

{% /tab %}

## Hostname resolution{% #hostname-resolution %}

See [Mapping OpenTelemetry Semantic Conventions to Hostnames](http://localhost:1313/opentelemetry/schema_semantics/hostname/) to understand how the hostname is resolved.

## Deployment-based limitations{% #deployment-based-limitations %}

The OpenTelemetry Collector has [two primary deployment methods](https://opentelemetry.io/docs/collector/deployment/): Agent and Gateway. Depending on your deployment method, the following components are available:

| Deployment mode | Host metrics | Kubernetes orchestration metrics | Traces | Logs auto-ingestion |
| --------------- | ------------ | -------------------------------- | ------ | ------------------- |
| as Gateway      | yes          | yes                              |
| as Agent        | yes          | yes                              | yes    | yes                 |

## Further reading{% #further-reading %}

- [Configuring the OpenTelemetry Collector](http://localhost:1313/opentelemetry/setup/collector_exporter/)
- [OpenTelemetry Collector Deployment](https://opentelemetry.io/docs/collector/deployment/)
