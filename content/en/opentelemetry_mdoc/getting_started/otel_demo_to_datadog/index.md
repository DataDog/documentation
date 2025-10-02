---
title: Sending Data from the OpenTelemetry Demo to Datadog
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Getting Started with OpenTelemetry at
  Datadog > Sending Data from the OpenTelemetry Demo to Datadog
sourceUrl: >-
  https://docs.datadoghq.com/opentelemetry/getting_started/otel_demo_to_datadog/index.html
---

# Sending Data from the OpenTelemetry Demo to Datadog

## Overview{% #overview %}

The [OpenTelemetry Demo](https://github.com/open-telemetry/opentelemetry-demo) is a microservices demo application developed by the community to demonstrate OpenTelemetry (OTel) instrumentation and its observability capabilities. It is an e-commerce web page composed of multiple microservices communicating with each other through HTTP and gRPC. All services are instrumented with OpenTelemetry and produce traces, metrics, and logs.

This page guides you through the steps required to deploy the OpenTelemetry Demo and send its data to Datadog.

## Prerequisites{% #prerequisites %}

To complete this guide, ensure you have the following:

1. [Create a Datadog account](https://www.datadoghq.com/free-datadog-trial/) if you haven't yet.
1. Find or create your [Datadog API key](https://app.datadoghq.com/organization-settings/api-keys/).
1. 6 GB of free RAM for the application.

You can deploy the demo using Docker or Kubernetes (with Helm). Choose your preferred deployment method and make sure you have the necessary tools installed:

{% tab title="Docker" %}

- Docker
- Docker Compose v2.0.0+
- Make (optional)

{% /tab %}

{% tab title="Kubernetes" %}

- Kubernetes 1.24+
- Helm 3.9+
- An active Kubernetes cluster with kubectl configured to connect to it

{% /tab %}

## Configuring and deploying the demo{% #configuring-and-deploying-the-demo %}

### Cloning the repository{% #cloning-the-repository %}

Clone the `opentelemetry-demo` repository to your device:

```shell
git clone https://github.com/open-telemetry/opentelemetry-demo.git
```

### Configuring the OpenTelemetry Collector{% #configuring-the-opentelemetry-collector %}

To send the demo's telemetry data to Datadog you need to add three components to the OpenTelemetry Collector configuration:

- `Resource Processor` is an `optional` component which is recommended, used to set the `env` tag for Datadog.
- `Datadog Connector` is responsible for computing Datadog APM Trace Metrics.
- `Datadog Exporter` is responsible for exporting Traces, Metrics and Logs to Datadog.
- `Datadog Extension` is an `optional` component which allows you to view OpenTelemetry Collector configuration within infrastructure monitoring. (Read more at [Datadog Extension](https://docs.datadoghq.com/opentelemetry/integrations/datadog_extension/)).

Complete the following steps to configure these three components.

{% tab title="Docker" %}

1. Open the demo repository. Create a file called `docker-compose.override.yml` in the root folder.

1. Open the created file. Paste the following content and set the [Datadog site](https://docs.datadoghq.com/getting_started/site/) and [Datadog API key](https://app.datadoghq.com/organization-settings/api-keys/) environment variables:

   ```yaml
   services:
     otel-collector:
       command:
         - "--config=/etc/otelcol-config.yml"
         - "--config=/etc/otelcol-config-extras.yml"
         - "--feature-gates=datadog.EnableOperationAndResourceNameV2"
       environment:
         - DD_SITE_PARAMETER=<Your API Site>
         - DD_API_KEY=<Your API Key>
   ```

1. To configure the OpenTelemetry Collector, open `src/otel-collector/otelcol-config-extras.yml` and add the following to the file:

   ```yaml
   extensions:
     datadog/extension:
       api:
         site: ${env:DD_SITE_PARAMETER}
         key: ${env:DD_API_KEY}
       http:
         endpoint: "localhost:9875"
         path: "/metadata"
   
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
     extensions: [datadog/extension]
     pipelines:
       traces:
         processors: [resource, resourcedetection, memory_limiter, transform, batch]
         exporters: [otlp, debug, spanmetrics, datadog, datadog/connector]
       metrics:
         receivers: [datadog/connector, docker_stats, httpcheck/frontend-proxy, hostmetrics, nginx, otlp, postgresql, redis, spanmetrics]
         processors: [resource, resourcedetection, memory_limiter, transform, batch]
         exporters: [otlphttp/prometheus, debug, datadog]
       logs:
         processors: [resource, resourcedetection, memory_limiter, transform, batch]
         exporters: [opensearch, debug, datadog]
   ```

By default, the collector in the demo application merges the configuration from two files:

   - `src/otel-collector/otelcol-config.yml`: contains the default configuration for the collector.
   - `src/otel-collector/otelcol-config-extras.yml`: used to add extra configuration to the collector.
Important alert (level: info): When merging YAML values, objects are merged and arrays are replaced. That's why there are more components specified in the pipelines than actually configured. The previous configuration does not replace the values configured in the main `otelcol-config` file.

{% /tab %}

{% tab title="Kubernetes" %}

1. Create a secret named `dd-secrets` to store Datadog Site and API Key secrets:

   ```shell
   kubectl create secret generic dd-secrets --from-literal="DD_SITE_PARAMETER=<Your API Site>" --from-literal="DD_API_KEY=<Your API Key>"
   ```

1. Add the OpenTelemetry [Helm chart](https://opentelemetry.io/docs/demo/kubernetes-deployment/) to your repo to manage and deploy the OpenTelemetry Demo:

   ```shell
   helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
   ```

1. Create a file named `my-values-file.yml` with the following content:

   ```yaml
   opentelemetry-collector:
     extraEnvsFrom:
       - secretRef:
           name: dd-secrets
     config:
       extensions:
         datadog/extension:
           api:
             site: ${env:DD_SITE_PARAMETER}
             key: ${env:DD_API_KEY}
           http:
             endpoint: "localhost:9875"
             path: "/metadata"
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
         extensions: [datadog/extension]
         pipelines:
           traces:
             processors: [resource, resourcedetection, memory_limiter, transform, batch]
             exporters: [otlp, debug, spanmetrics, datadog, datadog/connector]
           metrics:
             receivers: [datadog/connector, docker_stats, httpcheck/frontend-proxy, hostmetrics, nginx, otlp, postgresql, redis, spanmetrics]
             processors: [resource, resourcedetection, memory_limiter, transform, batch]
             exporters: [otlphttp/prometheus, debug, datadog]
           logs:
             processors: [resource, resourcedetection, memory_limiter, transform, batch]
             exporters: [opensearch, debug, datadog]
   ```
Important alert (level: info): When merging YAML values, objects are merged and arrays are replaced. That's why there are more components specified in the pipelines than actually configured. The previous configuration does not replace the values configured in the main `otelcol-config` file.

{% /tab %}

### Running the demo{% #running-the-demo %}

{% tab title="Docker" %}
If you have make installed, you can use the following command to start the demo:

```shell
make start
```

If you don't have `make` installed, you can use the `docker compose` command directly:

```shell
docker compose up --force-recreate --remove-orphans --detach
```

{% /tab %}

{% tab title="Kubernetes" %}
To deploy the demo application on Kubernetes using Helm, run the following command:

```shell
helm install my-otel-demo open-telemetry/opentelemetry-demo --values my-values-file.yml
```

{% /tab %}

## Navigating the application{% #navigating-the-application %}

You can access the Astronomy Shop web UI to explore the application and observe how the telemetry data is generated.

{% tab title="Docker" %}
Go to [http://localhost:8080](http://localhost:8080).
{% /tab %}

{% tab title="Kubernetes" %}

1. If you are running a local cluster, you need to port forward the frontend proxy:

   ```shell
   kubectl port-forward svc/my-otel-demo-frontendproxy 8080:8080
   ```

1. Go to [http://localhost:8080](http://localhost:8080).

{% /tab %}

## Telemetry data correlation{% #telemetry-data-correlation %}

The instrumentation steps used in all services from the Demo can be found on the main OpenTelemetry documentation.

You can find the language in which each service was implemented as well as its documentation in the [language feature reference table](https://opentelemetry.io/docs/demo/#language-feature-reference).

## Exploring OpenTelemetry data in Datadog{% #exploring-opentelemetry-data-in-datadog %}

When the OTel Demo is running, the built-in load generator simulates traffic in the application. After a couple of seconds you can see data arriving in Datadog.

### Software Catalog{% #software-catalog %}

View all services that are part of the OTel Demo:

1. Go to [**APM** > **Software Catalog**](https://app.datadoghq.com/services).

{% image
   source="https://datadog-docs.imgix.net/images/getting_started/opentelemetry/otel_demo/software_catalog.e36240fcf4cd93b039d6674c979a63dd.png?auto=format"
   alt="View Software Catalog page with list of services from OpenTelemetry demo application" /%}
Select **Map** to see how the services are connected. Change the **Map layout** to **Cluster** or **Flow** to view the map in different modes.
{% image
   source="https://datadog-docs.imgix.net/images/getting_started/opentelemetry/otel_demo/software_catalog_flow.d8cec924d55bd504f247a3f4429844ed.png?auto=format"
   alt="View Service Map Flow with all services connected" /%}
Select the **Catalog** view, then select a service to view a performance summary in the side panel.
{% image
   source="https://datadog-docs.imgix.net/images/getting_started/opentelemetry/otel_demo/software_catalog_service.9e535c06677130006059fc60b91be65b.png?auto=format"
   alt="View summary of performance and setup guidance from specific service" /%}

### Trace Explorer{% #trace-explorer %}

Explore traces received from the OTel Demo:

1. From **Performance** > **Setup Guidance**, click **View Traces** to open the Trace Explorer, with the selected service applied as a filter.

{% image
   source="https://datadog-docs.imgix.net/images/getting_started/opentelemetry/otel_demo/traces_view.b525daf355b649b91b0650a7c8d72e1e.png?auto=format"
   alt="Traces view with all indexed spans for checkout service" /%}
Select an indexed span to view the full trace details for this transaction.
{% image
   source="https://datadog-docs.imgix.net/images/getting_started/opentelemetry/otel_demo/trace_waterfall.e1b3a6d28322156488acc866ed381508.png?auto=format"
   alt="Trace view with all spans belonging to that specific transaction" /%}
Navigate through the tabs to view additional details:
- Infrastructure metrics for the services reporting Host Metrics.
- Runtime metrics for the services that have already been implemented.
- Log entries correlated with this trace.
- Span links linked to this trace.

### Trace Queries{% #trace-queries %}

Datadog allows you to filter and group the received OpenTelemetry data. For example, to find all transactions from a specific user, you can use Trace Queries.

The OTel Demo sends `user.id` as span tags, so you can use this to filter all transactions triggered by the user:

1. From **Info** in the side panel, hover over the line with the user ID, click the **cog** icon, and select **filter by @app.user.id:<user\_id>**.

1. Remove any previous filters, leaving only **@app.user.id** applied to view all transactions containing spans with the specified user ID.

{% image
   source="https://datadog-docs.imgix.net/images/getting_started/opentelemetry/otel_demo/trace_query.da7009353f9f418dd29156665954e35f.png?auto=format"
   alt="Trace query filtering all spans that contain a specific app.user.id" /%}

### Error Tracking{% #error-tracking %}

The OpenTelemetry Demo includes a feature flag engine for simulating error scenarios.

1. Navigate to [http://localhost:8080/feature](http://localhost:8080/feature) to manage the available scenarios. See the [OpenTelemetry Demo documentation](https://opentelemetry.io/docs/demo/feature-flags/) for more details.
1. After the demo starts producing errors, you can visualize and track down the affected services in Datadog.

{% image
   source="https://datadog-docs.imgix.net/images/getting_started/opentelemetry/otel_demo/error_tracking.58c4cc6954bd7f4a78aa6478009919af.png?auto=format"
   alt="Error tracking view showing error PaymentService Fail Feature Flag Enabled" /%}

### OpenTelemetry Collector Configuration{% #opentelemetry-collector-configuration %}

The Datadog Extension allows you to view OpenTelemetry Collector configuration within Datadog on either one of the following pages:

- [Infrastructure List](https://app.datadoghq.com/infrastructure).
- [Resource Catalog](https://app.datadoghq.com/infrastructure/catalog).

When selecting the hostname where the Collector is running, you can visualize its full configuration:

{% image
   source="https://datadog-docs.imgix.net/images/getting_started/opentelemetry/otel_demo/collector_full_config.1724cf7145230f9b30bfd82b600accd7.png?auto=format"
   alt="OpenTelemetry Collector configuration rendered within Datadog" /%}

## Further Reading{% #further-reading %}

- [Software Catalog](https://docs.datadoghq.com/software_catalog/)
- [Trace Explorer](https://docs.datadoghq.com/tracing/trace_explorer/)
- [Trace Queries](https://docs.datadoghq.com/tracing/trace_explorer/trace_queries/)
- [Error Tracking](https://docs.datadoghq.com/error_tracking/)
