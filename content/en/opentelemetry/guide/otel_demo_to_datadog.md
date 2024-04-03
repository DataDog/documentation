---
title: Sending data from OpenTelemetry Demo to Datadog
kind: Documentation
further_reading:
- link: "https://www.datadoghq.com/blog/opentelemetry-instrumentation/"
  tag: "Blog"
  text: "Datadog's partnership with OpenTelemetry"
- link: "https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/"
  tag: "Blog"
  text: Send metrics and traces from OpenTelemetry Collector to Datadog via Datadog Exporter
- link: "https://www.datadoghq.com/blog/opentelemetry-logs-datadog-exporter/"
  tag: "Blog"
  text: "Forward logs from the OpenTelemetry Collector with the Datadog Exporter"
- link: "https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-opentelemetry-protocol-support/"
  tag: "Blog"
  text: "OTLP ingestion in the Agent"
- link: "https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/"
  tag: "Blog"
  text: "Correlate Datadog RUM events with traces from OpenTelemetry-instrumented applications"
- link: "https://www.datadoghq.com/blog/opentelemetry-runtime-metrics-datadog/"
  tag: "Blog"
  text: "Monitor runtime metrics from OTel-instrumented apps with Datadog APM"
algolia:
  tags: ['opentelemetry', 'open telemetry', 'otel', 'opentelemetry demo']
---

## Overview

The [OpenTelemetry Demo][1] is a microservices demo application developed by the community to demonstrate OpenTelemetry (OTel)
instrumentation and its observability capabilities.

It is an e-commerce web page composed by multiple microservices communicating with each other through HTTP and gRPC. All services
are instrumented with OpenTelemetry and producing Traces, Metrics and Logs.

This page guides you through the required steps to deploy the OpenTelemetry Demo and send its data to Datadog.

## Prerequisites

The demo can be deployed using Docker or Kubernetes (with Helm). To complete this guide,
make sure you have all prerequisites for the chosen option.

### General

1. 6 GB of free RAM for the application.
2. [Create a Datadog account][2] if you haven't yet.
3. Find or create your [Datadog API key][3].

### Deployment choice

{{< tabs >}}
{{% tab "Docker" %}}

4. Docker
5. Docker Compose v2.0.0+
6. Make (optional)

{{% /tab %}}

{{% tab "Kubernetes" %}}

4. Kubernetes 1.24+
5. Helm 3.9+

{{% /tab %}}
{{< /tabs >}}

## Steps

### Cloning the repository

```shell
git clone https://github.com/open-telemetry/opentelemetry-demo.git
```

### Configuring the OpenTelemetry Collector

To send all the telemetry data produced by the Demo to your Datadog
account, you need to configure the OpenTelemetry Collector.

{{< tabs >}}
{{% tab "Docker" %}}

1. Export your Datadog API site to an environment variable

    ```shell
    export DD_SITE=<Your API Site>
    ```

2. Export your Datadog API key to an environment variable

    ```shell
    export DD_API_KEY=<Your API Key>
    ```

3. Configure the OpenTelemetry Collector

    By default, the collector in the demo application merges the configuration from two files:

    - `src/otelcollector/otelcol-config.yml`
      - Which contains the default configuration for the collector.
    - `src/otelcollector/otelcol-config-extras.yml`
      - Which can be used to add extra configuration to the collector.

    Open `src/otelcollector/otelcol-config-extras.yml` in an IDE or a text editor of your choice and add the following to the file:

    ```yaml
    exporters:
      datadog:
        traces:
          span_name_as_resource_name: true
          trace_buffer: 500
        hostname: "otelcol-docker"
        api:
          site: ${DD_API_SITE}
          key: ${DD_API_KEY}

    processors:
      resource:
        attributes:
          - key: deployment.environment   # Set env tag for Datadog
            value: "otel"
            action: upsert

    connectors:
        datadog/connector:

    service:
      pipelines:
        traces:
          processors: [batch, resource]
          exporters: [otlp, debug, spanmetrics, datadog, datadog/connector]
        metrics:
          receivers: [httpcheck/frontendproxy, otlp, spanmetrics, datadog/connector]
          processors: [batch, resource]
          exporters: [otlphttp/prometheus, debug, datadog]
        logs:
          processors: [batch, resource]
          exporters: [opensearch, debug, datadog]
    ```

    <div class="alert alert-info">
    Note

    When merging YAML values, objects are merged and arrays are replaced.\
    That's the reason why there are more components specified in the pipelines than actually configured.\
    The above configuration does not replace the values configured in the main otelcol-config file.
    </div>

{{% /tab %}}

{{% tab "Kubernetes" %}}

1. Create a secret named `dd-secrets` to store Datadog Site and API Key secrets.

    ```shell
    kubectl create secret generic dd-secrets --from-literal="DD_SITE=<Your API Site>" --from-literal="DD_API_KEY=<Your API Key>"
    ```

2. Add the OpenTelemetry [Helm chart][4] to your repo to manage and deploy the OpenTelemetry Demo.

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
              span_name_as_resource_name: true
              trace_buffer: 500
            hostname: "otelcol-helm"
            api:
              site: ${env:DD_SITE}
              key: ${env:DD_API_KEY}

        processors:
          resource:
            attributes:
              - key: deployment.environment   # Set env tag for Datadog
                value: "otel"
                action: upsert

        connectors:
            datadog/connector:

        service:
          pipelines:
            traces:
              processors: [batch, resource]
              exporters: [otlp, debug, spanmetrics, datadog, datadog/connector]
            metrics:
              receivers: [otlp, spanmetrics, datadog/connector]
              processors: [batch, resource]
              exporters: [otlphttp/prometheus, debug, datadog]
            logs:
              processors: [batch, resource]
              exporters: [opensearch, debug, datadog]
    ```

    <div class="alert alert-info">
    Note

    When merging YAML values, objects are merged and arrays are replaced.\
    That's the reason why there are more components specified in the pipelines than actually configured.\
    The above configuration does not replace the values configured in the main otelcol-config file.
    </div>

[4]: https://opentelemetry.io/docs/demo/kubernetes-deployment/

{{% /tab %}}
{{< /tabs >}}

### Run the Demo

{{< tabs >}}
{{% tab "Docker" %}}

```shell
make start
```

Or, if you don't have `make` installed, you can use the following:

```shell
docker compose up --force-recreate --remove-orphans --detach
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

```shell
helm install my-otel-demo open-telemetry/opentelemetry-demo --values my-values-file.yml
```

{{% /tab %}}
{{< /tabs >}}

## Navigating the application

The OTel Demo comes with a load generator. In case you want to check how the Astronomy Shop
looks like, you can navigate to its Web UI.

{{< tabs >}}
{{% tab "Docker" %}}

In Docker the page should be already accessible at <http://localhost:8080>.

{{% /tab %}}

{{% tab "Kubernetes" %}}

In Kubernetes, if you are running a local cluster, you will need to first port
forward the frontend proxy:

```shell
kubectl port-forward svc/my-otel-demo-frontendproxy 8080:8080
```

And then, you can navigate to <http://localhost:8080>.

{{% /tab %}}
{{< /tabs >}}

## Exploring OpenTelemetry data in Datadog

As soon as the OTel Demo is running, the load generator will simulate traffic in the application.
In a couple of seconds you can already see data arriving in Datadog.

### Service Catalog

Check out all services that are part of the OTel Demo.

1. Go to **APM** > **Service Catalog**.

{{< img src="/getting_started/opentelemetry/otel_demo/service_catalog.png" alt="View Service Catalog page with list of services from OpenTelemetry demo application" style="width:90%;" >}}

2. On the top left corner, select **Map** to see how the services are connected (you can choose view the map as Cluster or Flow on the top right corner).

{{< img src="/getting_started/opentelemetry/otel_demo/service_catalog_flow.png" alt="View Service Map Flow with all services connected" style="width:90%;" >}}

3. Go back to **List** (top left corner) and select one of the services to view a summarized view of Performance from the selected service.

{{< img src="/getting_started/opentelemetry/otel_demo/service_catalog_service.png" alt="View summary of performance and setup guidance from specific service" style="width:90%;" >}}

4. From the previous view, you can navigate to the Distributed Tracing view in order to explore the received traces.

### Distributed Tracing

1. Click on **View Traces** to navigate to the **Traces** view, with the selected service applied as filter.

{{< img src="/getting_started/opentelemetry/otel_demo/traces_view.png" alt="Traces view with all indexed spans for checkout service" style="width:90%;" >}}

2. Select one of the indexed spans to see the whole Trace of which this transaction belongs to. In this view, you can see in context everything
that is being sent to Datadog related to this Trace.

{{< img src="/getting_started/opentelemetry/otel_demo/trace_flamegraph.png" alt="Trace view with all spans belonging to that specific transaction" style="width:90%;" >}}

3. Infrastructure metrics for the services reporting Host Metrics.

{{< img src="/getting_started/opentelemetry/otel_demo/infrastructure_metrics.png" alt="Flame graph trace view on top and Host Metrics at the bottom" style="width:90%;" >}}

4. Runtime metrics for the services that have that already implemented.

{{< img src="/getting_started/opentelemetry/otel_demo/runtime_metrics.png" alt="Flame graph trace view on top and Runtime Metrics at the bottom" style="width:90%;" >}}

5. All the log entries correlated with this Trace.

{{< img src="/getting_started/opentelemetry/otel_demo/logs.png" alt="Flame graph trace view on top and logs at the bottom" style="width:90%;" >}}

6. All span links linked to this Trace. If you want to you can click on the span, to navigate to the linked span.

{{< img src="/getting_started/opentelemetry/otel_demo/logs.png" alt="Flame graph trace view on top and span links at the bottom" style="width:90%;" >}}

### Trace Queries

As Datadog is receiving all this OpenTelemetry data, you can take advantage of Datadog's features to slice and dice that data.

Imagine you would like to find all transaction from a specific user.

As the OTel Demo sends `user.id` as span tags, you can use it with Trace Queries for filtering all transactions this user triggered.

You can use the Span Info view to help you out.

1. Mouse hover the line where user id is, click on the **engine** icon and **filter by @app.user.id:<user_id>**.

2. You may need to clean up some previous filters that were applied, but once you have only the **@app.user.id** applied, you
will be able to see all transactions that contain spans which this user id is present.

{{< img src="/getting_started/opentelemetry/otel_demo/trace_query.png" alt="Trace query filtering all spans that contain a specific app.user.id" style="width:90%;" >}}

### Error Tracking

The OpenTelemetry Demo comes with a [flagd][5], a feature flag evaluation engine, which can be used to simulate some error scenarios.

In your IDE or text editor, you can navigate to the file: `src/flagd/demo.flagd.json` and set the `defaultVariant` to `on` in one of the cases.

You can check all available cases in the official [OpenTelemetry Demo documentation][6].

Once the demo starts producing errors, you can visualize them in Datadog and track down what are the affected services.

{{< img src="/getting_started/opentelemetry/otel_demo/error_tracking.png" alt="Error tracking view showing error PaymentService Fail Feature Flag Enabled" style="width:90%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-demo
[2]: https://www.datadoghq.com/free-datadog-trial/
[3]: https://app.datadoghq.com/organization-settings/api-keys/
[5]: https://flagd.dev/
[6]: https://opentelemetry.io/docs/demo/feature-flags/
