---
title: Deploy the OpenTelemetry Collector
aliases:
- /opentelemetry/collector_exporter/deployment
further_reading:
- link: "/opentelemetry/setup/collector_exporter/"
  tag: "Documentation"
  text: "OpenTelemetry Collector Setup"
- link: "https://opentelemetry.io/docs/collector/deployment/"
  tag: "External Site"
  text: "OpenTelemetry Collector Deployment"
---

This page covers deployment options for the OpenTelemetry Collector when sending data to Datadog. For the recommended Collector configuration, see [Set Up the OpenTelemetry Collector][1].

## On a host

Run the Collector with your configuration file, the required feature gate, and the `DD_SITE` and `DD_API_KEY` environment variables:

```shell
DD_SITE={{< region-param key="dd_site" >}} DD_API_KEY=<YOUR_API_KEY> \
  otelcol-contrib --config collector.yaml \
  --feature-gates connector.spanmetrics.includeCollectorInstanceID
```

## Docker

{{< tabs >}}
{{% tab "Same host" %}}
To run the Collector as a Docker container and receive data from applications on the same host:

```shell
docker run \
    -p 4317:4317 \
    -p 4318:4318 \
    -e DD_API_KEY \
    -e DD_SITE \
    -v /:/hostfs:ro \
    -v $(pwd)/collector.yaml:/etc/otelcol-contrib/config.yaml \
    otel/opentelemetry-collector-contrib:0.150.1 \
    --feature-gates connector.spanmetrics.includeCollectorInstanceID
```

The `/:/hostfs:ro` mount is required for the `hostmetrics` receiver to collect host-level metrics from inside the container.

{{% /tab %}}
{{% tab "Other containers" %}}

To receive data from other containers, create a shared Docker network:

1. Create a Docker network:

    ```shell
    docker network create <NETWORK_NAME>
    ```

2. Run the Collector on the network:

   ```shell
   docker run -d --name opentelemetry-collector \
       --network <NETWORK_NAME> \
       -e DD_API_KEY \
       -e DD_SITE \
       -v /:/hostfs:ro \
       -v $(pwd)/collector.yaml:/etc/otelcol-contrib/config.yaml \
       otel/opentelemetry-collector-contrib:0.150.1 \
       --feature-gates connector.spanmetrics.includeCollectorInstanceID
   ```

3. Run your application container on the same network, pointing it to the Collector:

   ```shell
   docker run -d --name app \
       --network <NETWORK_NAME> \
       -e OTEL_EXPORTER_OTLP_ENDPOINT=http://opentelemetry-collector:4318 \
       company/app:latest
   ```

{{% /tab %}}
{{< /tabs >}}

## Kubernetes

{{< tabs >}}
{{% tab "DaemonSet" %}}

A DaemonSet is the recommended deployment pattern for collecting telemetry from all nodes in a Kubernetes cluster.

1. Use the [recommended Collector configuration][1] for Kubernetes, which includes the `k8s_attributes` processor for enriching telemetry with pod and container metadata.

2. Expose the OTLP receiver ports so applications can send data to the Collector:
   ```yaml
   ports:
     - containerPort: 4318
       hostPort: 4318
     - containerPort: 4317
       hostPort: 4317
   ```

3. Mount the host filesystem for the `hostmetrics` receiver:
   ```yaml
   volumeMounts:
     - name: hostfs
       mountPath: /hostfs
       readOnly: true
       mountPropagation: HostToContainer
   volumes:
     - name: hostfs
       hostPath:
         path: /
   ```

4. Configure your application pods to send data to the Collector on the node:
   ```yaml
   env:
     - name: HOST_IP
       valueFrom:
         fieldRef:
           fieldPath: status.hostIP
     - name: OTEL_EXPORTER_OTLP_ENDPOINT
       value: "http://$(HOST_IP):4318"
   ```

The `k8s_attributes` processor requires a ServiceAccount with permissions to read pod metadata. See [the Kubernetes Attributes Processor documentation][2] for RBAC setup instructions.

[1]: /opentelemetry/setup/collector_exporter/install?tab=kubernetesdaemonset
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/k8sattributesprocessor#role-based-access-control

{{% /tab %}}

{{% tab "Helm" %}}

Deploy the Collector using [the official OpenTelemetry Collector Helm chart][1]:

1. Create a Kubernetes secret with your Datadog API key:
   ```shell
   kubectl create secret generic datadog-secrets --from-literal=api-key='<YOUR_API_KEY>'
   ```

2. Add the Helm repository:
   ```shell
   helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
   ```

3. Install with the recommended values file:
   ```shell
   helm install otelcol open-telemetry/opentelemetry-collector --values values.yaml
   ```

For a complete `values.yaml`, see the [example values file][2] in the `opentelemetry-examples` repository. The Helm chart automates volume mounts, service accounts, and feature gates.

[1]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector
[2]: https://github.com/DataDog/opentelemetry-examples/tree/experimental-oss-config/configurations/opentelemetry-collector

{{% /tab %}}

{{% tab "Operator" %}}

To use the OpenTelemetry Operator, follow the [official documentation for deploying the OpenTelemetry Operator][1]. Deploy the certificate manager in addition to the Operator.

Configure the Operator using the [recommended Collector configuration][2] for Kubernetes DaemonSet deployments.

[1]: https://github.com/open-telemetry/opentelemetry-operator#readme
[2]: /opentelemetry/setup/collector_exporter/install?tab=kubernetesdaemonset

{{% /tab %}}
{{< /tabs >}}

## Deployment-based limitations

The available features depend on how you deploy the Collector:

| Deployment mode | Host metrics | Kubernetes orchestration metrics | Traces | Logs auto-ingestion |
| --- | --- | --- | --- | --- |
| as Gateway | | {{< X >}} | {{< X >}} | |
| as Agent (DaemonSet or host) | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |

## Hostname resolution

See [Mapping OpenTelemetry Semantic Conventions to Hostnames][2] to understand how Datadog resolves the hostname from your Collector's telemetry data.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/setup/collector_exporter/install/
[2]: /opentelemetry/schema_semantics/hostname/
