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

It is an e-commerce web page composed by multiple microservices which communicate with each other via HTTP and gRPC, all services
are instrumented with OpenTelemetry and producing Traces, Metrics and Logs.

This page will guide you through the steps to deploy the OpenTelemetry Demo and send its data to Datadog.

## Prerequisites

The demo can be deployed using Docker or Kubernetes (with Helm),
to complete this guide, make sure you have all prerequisites for the chosen deployment option.

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

In this section you will configure the OpenTelemetry Collector in order to send all the telemetry data produced by the Demo
to your Datadog account.

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

    By default, the collector in the demo application will merge the configuration from two files:

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
      cumulativetodelta:
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
          processors: [batch, resource, cumulativetodelta]
          exporters: [otlphttp/prometheus, debug, datadog]
        logs:
          processors: [batch, resource]
          exporters: [opensearch, debug, datadog]
    ```

    <div class="alert alert-info">
    Note

    When merging YAML values, objects are merged and arrays are replaced.\
    That's the reason why we have more components specified in the pipelines than we actually have configured.\
    With the above configuration we do not replace the values configured in the main otelcol-config file.
    </div>

{{% /tab %}}

{{% tab "Kubernetes" %}}

1. Create a secret named `dd-secrets` to store Datadog Site and API Key secrets.

    ```shell
    kubectl create secret generic dd-secrets --from-literal="DD_SITE=<Your API Site>" --from-literal="DD_API_KEY=<Your API Key>"
    ```

2. Add the OpenTelemetry [Helm chart][4] to your repo in order to manage and deploy the OpenTelemetry Demo.

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
          cumulativetodelta:
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
              processors: [batch, resource, cumulativetodelta]
              exporters: [otlphttp/prometheus, debug, datadog]
            logs:
              processors: [batch, resource]
              exporters: [opensearch, debug, datadog]
    ```

    <div class="alert alert-info">
    Note

    When merging YAML values, objects are merged and arrays are replaced.\
    That's the reason why we have more components specified in the pipelines than we actually have configured.\
    With the above configuration we do not replace the values configured in the main otelcol-config file.
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

The OTel demo comes with a load generator, but in case you want to check how the Astronomy Shop
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

As soon as the OTel demo is running, the load generator will simulate traffic in the application, and
in a couple of seconds you can already start seeing data arriving in Datadog.

### Service Catalog

Check out all services that are part of the OTel demo.

1. Go to **APM** > **Service Catalog**.

{{< img src="/getting_started/opentelemetry/otel_demo/service_catalog.png" alt="View Service Catalog page with list of services from OpenTelemetry demo application" style="width:90%;" >}}

2. On the top left corner, select **Map** to see how the services are connected (you can view the map as Cluster or Flow).

{{< img src="/getting_started/opentelemetry/otel_demo/service_catalog_flow.png" alt="View Service Catalog page with list of services from OpenTelemetry demo application" style="width:90%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-demo
[2]: https://www.datadoghq.com/free-datadog-trial/
[3]: https://app.datadoghq.com/organization-settings/api-keys/
