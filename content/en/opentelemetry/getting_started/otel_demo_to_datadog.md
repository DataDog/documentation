---
title: Sending Data from the OpenTelemetry Demo to Datadog
aliases:
- /opentelemetry/guide/otel_demo_to_datadog
- /opentelemetry/otel_demo_to_datadog
further_reading:
- link: "/software_catalog/"
  tag: "Documentation"
  text: "Software Catalog"
- link: "/tracing/trace_explorer/"
  tag: "Documentation"
  text: "Trace Explorer"
- link: "/tracing/trace_explorer/trace_queries/"
  tag: "Documentation"
  text: "Trace Queries"
- link: "/error_tracking/"
  tag: "Documentation"
  text: "Error Tracking"
algolia:
  tags: ['opentelemetry', 'open telemetry', 'otel', 'opentelemetry demo']
---

## Overview

The [OpenTelemetry Demo][1] is a microservices demo application developed by the community to demonstrate OpenTelemetry (OTel)
instrumentation and its observability capabilities. It is an e-commerce web page composed of multiple microservices communicating with each other through HTTP and gRPC. All services are instrumented with OpenTelemetry and produce traces, metrics, and logs.

This page guides you through the steps required to deploy the OpenTelemetry Demo and send its data to Datadog.

## Prerequisites

To complete this guide, ensure you have the following:

1. [Create a Datadog account][2] if you haven't yet.
2. Find or create your [Datadog API key][3].
3. 6 GB of free RAM for the application.

You can deploy the demo using Docker or Kubernetes (with Helm). Choose your preferred deployment method and make sure you have the necessary tools installed:

{{< tabs >}}
{{% tab "Docker" %}}

- Docker
- Docker Compose v2.0.0+
- Make (optional)

{{% /tab %}}

{{% tab "Kubernetes" %}}

- Kubernetes 1.24+
- Helm 3.9+
- An active Kubernetes cluster with kubectl configured to connect to it

{{% /tab %}}
{{< /tabs >}}

## Configuring and deploying the demo

### Cloning the repository

Clone the `opentelemetry-demo` repository to your device:

```shell
git clone https://github.com/open-telemetry/opentelemetry-demo.git
```

### Configuring the OpenTelemetry Collector

To send the demo's telemetry data to Datadog you need to add three components to the OpenTelemetry Collector configuration:

- `Resource Processor` is an `optional` component which is recommended, used to set the `env` tag for Datadog.
- `Datadog Connector` is responsible for computing Datadog APM Trace Metrics.
- `Datadog Exporter` is responsible for exporting Traces, Metrics and Logs to Datadog.

Complete the following steps to configure these three components.

{{< tabs >}}
{{% tab "Docker" %}}

1. Open the demo repository. Create a file called `docker-compose.override.yml` in the root folder.

2. Open the created file. Paste the following content and set the [Datadog site][7] and [Datadog API key][8] environment variables:

    ```yaml
    services:
      otelcol:
        command:
          - "--config=/etc/otelcol-config.yml"
          - "--config=/etc/otelcol-config-extras.yml"
        environment:
          - DD_SITE_PARAMETER=<Your API Site>
          - DD_API_KEY=<Your API Key>
    ```

3. To configure the OpenTelemetry Collector, open `src/otelcollector/otelcol-config-extras.yml` and add the following to the file:

    ```yaml
    exporters:
      datadog:
        traces:
          compute_stats_by_span_kind: true
          trace_buffer: 500
        hostname: "otel-collector-docker"
        api:
          site: ${env:DD_SITE_PARAMETER}
          key: ${env:DD_API_KEY}

    processors:
      resource:
        attributes:
          - key: deployment.environment
            value: "otel"
            action: upsert

    connectors:
      datadog/connector:
        traces:
          compute_stats_by_span_kind: true

    service:
      pipelines:
        traces:
          processors: [resource, batch]
          exporters: [otlp, debug, spanmetrics, datadog, datadog/connector]
        metrics:
          receivers: [docker_stats, httpcheck/frontendproxy, otlp, prometheus, redis, spanmetrics, datadog/connector]
          processors: [resource, batch]
          exporters: [otlphttp/prometheus, debug, datadog]
        logs:
          processors: [resource, batch]
          exporters: [opensearch, debug, datadog]
    ```

    By default, the collector in the demo application merges the configuration from two files:

    - `src/otelcollector/otelcol-config.yml`: contains the default configuration for the collector.
    - `src/otelcollector/otelcol-config-extras.yml`: used to add extra configuration to the collector.

    <div class="alert alert-info">
    When merging YAML values, objects are merged and arrays are replaced.
    That's why there are more components specified in the pipelines than actually configured.
    The previous configuration does not replace the values configured in the main <code>otelcol-config</code> file.
    </div>

[7]: /getting_started/site/
[8]: https://app.datadoghq.com/organization-settings/api-keys/

{{% /tab %}}

{{% tab "Kubernetes" %}}

1. Create a secret named `dd-secrets` to store Datadog Site and API Key secrets:

    ```shell
    kubectl create secret generic dd-secrets --from-literal="DD_SITE_PARAMETER=<Your API Site>" --from-literal="DD_API_KEY=<Your API Key>"
    ```

2. Add the OpenTelemetry [Helm chart][4] to your repo to manage and deploy the OpenTelemetry Demo:

    ```shell
    helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
    ```

3. Create a file named `my-values-file.yml` with the following content:

    ```yaml
    opentelemetry-collector:
      extraEnvsFrom:
        - secretRef:
            name: dd-secrets
      config:
        exporters:
          datadog:
            traces:
              compute_stats_by_span_kind: true
              trace_buffer: 500
            hostname: "otelcol-helm"
            api:
              site: ${env:DD_SITE_PARAMETER}
              key: ${env:DD_API_KEY}

        processors:
          resource:
            attributes:
              - key: deployment.environment
                value: "otel"
                action: upsert

        connectors:
          datadog/connector:
            traces:
              compute_stats_by_span_kind: true

        service:
          pipelines:
            traces:
              processors: [resource, batch]
              exporters: [otlp, debug, spanmetrics, datadog, datadog/connector]
            metrics:
              receivers: [httpcheck/frontend-proxy, otlp, redis, spanmetrics, datadog/connector]
              processors: [resource, batch]
              exporters: [otlphttp/prometheus, debug, datadog]
            logs:
              processors: [resource, batch]
              exporters: [opensearch, debug, datadog]
    ```

    <div class="alert alert-info">
    When merging YAML values, objects are merged and arrays are replaced.
    That's why there are more components specified in the pipelines than actually configured.
    The previous configuration does not replace the values configured in the main <code>otelcol-config</code> file.
    </div>

[4]: https://opentelemetry.io/docs/demo/kubernetes-deployment/

{{% /tab %}}
{{< /tabs >}}

### Running the demo

{{< tabs >}}
{{% tab "Docker" %}}

If you have make installed, you can use the following command to start the demo:

```shell
make start
```

If you don't have `make` installed, you can use the `docker compose` command directly:

```shell
docker compose up --force-recreate --remove-orphans --detach
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

To deploy the demo application on Kubernetes using Helm, run the following command:

```shell
helm install my-otel-demo open-telemetry/opentelemetry-demo --values my-values-file.yml
```

{{% /tab %}}
{{< /tabs >}}

## Navigating the application

You can access the Astronomy Shop web UI to explore the application and observe how the telemetry data is generated.

{{< tabs >}}
{{% tab "Docker" %}}

Go to <http://localhost:8080>.

{{% /tab %}}

{{% tab "Kubernetes" %}}

1. If you are running a local cluster, you need to port forward the frontend proxy:

   ```shell
   kubectl port-forward svc/my-otel-demo-frontendproxy 8080:8080
   ```

2. Go to <http://localhost:8080>.

{{% /tab %}}
{{< /tabs >}}

## Telemetry data correlation

The instrumentation steps used in all services from the Demo can be found
on the main OpenTelemetry documentation.

You can find the language in which each service was implemented as well as its
documentation in the [language feature reference table][10].

## Exploring OpenTelemetry data in Datadog

When the OTel Demo is running, the built-in load generator simulates traffic in the application.
After a couple of seconds you can see data arriving in Datadog.

### Software Catalog

View all services that are part of the OTel Demo:

1. Go to [**APM** > **Software Catalog**][11].

{{< img src="/getting_started/opentelemetry/otel_demo/software_catalog.png" alt="View Software Catalog page with list of services from OpenTelemetry demo application" style="width:90%;" >}}

2. Select **Map** to see how the services are connected. Change the **Map layout** to **Cluster** or **Flow** to view the map in different modes.

{{< img src="/getting_started/opentelemetry/otel_demo/software_catalog_flow.png" alt="View Service Map Flow with all services connected" style="width:90%;" >}}

3. Select the **Catalog** view, then select a service to view a performance summary in the side panel.

{{< img src="/getting_started/opentelemetry/otel_demo/software_catalog_service.png" alt="View summary of performance and setup guidance from specific service" style="width:90%;" >}}

### Trace Explorer

Explore traces received from the OTel Demo:

1. From **Performance** > **Setup Guidance**, click **View Traces** to open the Trace Explorer, with the selected service applied as a filter.

{{< img src="/getting_started/opentelemetry/otel_demo/traces_view.png" alt="Traces view with all indexed spans for checkout service" style="width:90%;" >}}

2. Select an indexed span to view the full trace details for this transaction.

{{< img src="/getting_started/opentelemetry/otel_demo/trace_waterfall.png" alt="Trace view with all spans belonging to that specific transaction" style="width:90%;" >}}

3. Navigate through the tabs to view additional details:
   - Infrastructure metrics for the services reporting Host Metrics.
   - Runtime metrics for the services that have already been implemented.
   - Log entries correlated with this trace.
   - Span links linked to this trace.

### Trace Queries

Datadog allows you to filter and group the received OpenTelemetry data. For example, to find all transactions from a specific user, you can use Trace Queries.

The OTel Demo sends `user.id` as span tags, so you can use this to filter all transactions triggered by the user:

1. From **Info** in the side panel, hover over the line with the user ID, click the **cog** icon, and select **filter by @app.user.id:<user_id>**.

2. Remove any previous filters, leaving only **@app.user.id** applied to view all transactions containing spans with the specified user ID.

{{< img src="/getting_started/opentelemetry/otel_demo/trace_query.png" alt="Trace query filtering all spans that contain a specific app.user.id" style="width:90%;" >}}

### Error Tracking

The OpenTelemetry Demo includes a feature flag engine for simulating error scenarios.

1. Navigate to [http://localhost:8080/feature][12] to manage the available scenarios. See the [OpenTelemetry Demo documentation][5] for more details.
2. After the demo starts producing errors, you can visualize and track down the affected services in Datadog.

{{< img src="/getting_started/opentelemetry/otel_demo/error_tracking.png" alt="Error tracking view showing error PaymentService Fail Feature Flag Enabled" style="width:90%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-demo
[2]: https://www.datadoghq.com/free-datadog-trial/
[3]: https://app.datadoghq.com/organization-settings/api-keys/
[5]: https://opentelemetry.io/docs/demo/feature-flags/
[10]: https://opentelemetry.io/docs/demo/#language-feature-reference
[11]: https://app.datadoghq.com/services
[12]: http://localhost:8080/feature
