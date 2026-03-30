---
title: OpenTelemetry Source
disable_toc: false
further_reading:
  - link: https://www.datadoghq.com/blog/manage-metrics-cost-control-with-observability-pipelines
    tag: Blog
    text: Manage metric volume and tags in your environment with Observability Pipelines
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- name: Metrics
  icon: metrics
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' OpenTelemetry (OTel) source to collect logs or metrics from your OTel Collector through HTTP or gRPC. Select and set up this source when you set up a pipeline. The information below is configured in the pipelines UI.

**Notes**:
- If you are using the Datadog Distribution of OpenTelemetry (DDOT) Collector, use the OpenTelemetry source to [send data to Observability Pipelines](#send-data-from-the-datadog-distribution-of-opentelemetry-collector-to-observability-pipelines).
- If you are using the Splunk HEC Distribution of the OpenTelemetry Collector, use the [Splunk HEC source][4] to send logs to Observability Pipelines.

### When to use this source

Common scenarios when you might use this source:

- You are using [OpenTelemetry][1] as your standard method for collecting and routing data, and you want to normalize that data, before routing them to different destinations.
- You are collecting data from multiple sources and want to aggregate them in a central place for consistent processing.
    - For example, if some of your services export logs using OpenTelemetry, while other services use Datadog Agents or other Observability Pipelines [sources][2], you can aggregate all of your data in Observability Pipelines for processing.

## Prerequisites

If your forwarders are globally configured to enable SSL, you need the appropriate TLS certificates and the password you used to create your private key.

## Setup

Set up this source when you [set up a pipeline][6]. You can set up a pipeline in the [UI][10], using the [API][11], or with [Terraform][12]. The instructions in this section are for setting up the source in the UI.

<div class="alert alert-danger">Only enter the identifiers for the OpenTelemetry HTTP and gRPC listener addresses and, if applicable, the TLS key pass. Do <b>not</b> enter the actual values.</div>

1. Enter the identifier for your HTTP listener address. If you leave it blank, the [default](#set-secrets) is used.
1. Enter the identifier for your gRPC listener address. If you leave it blank, the [default](#set-secrets) is used.

### Optional TLS settings

Toggle the switch to enable TLS. The following certificate and key files are required for TLS.<br>**Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. See [Advanced Worker Configurations][3] for more information. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.
- Enter the identifier for your OTel TLS key pass. If you leave it blank, the [default](#set-secrets) is used.
- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) root file in DER or PEM (X.509).
- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) root file in DER or PEM (X.509).
- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS #8) format.

{{< img src="observability_pipelines/sources/otel_settings.png" alt="The OpenTelemetry source settings" style="width:35%;" >}}

## Set secrets

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- HTTP address identifier:
	- References the HTTP socket address on which the Observability Pipelines Worker listens for data from the OTel collector.
	- The default identifier is `SOURCE_OTEL_HTTP_ADDRESS`.
- gRPC address identifier:
	- References the gRPC socket address on which the Observability Pipelines Worker listens for data from the OTel collector.
	- The default identifier is `SOURCE_OTEL_GRPC_ADDRESS`.
- TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `SOURCE_OTEL_KEY_PASS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/opentelemetry %}}

{{% /tab %}}
{{< /tabs >}}

## Send data to the Observability Pipelines Worker

Configure your OTel exporters to point to HTTP or gRPC. The Worker exposes configurable listener ports for each protocol.

<div class="alert alert-info">The ports 4318 (HTTP) and 4317 (gRPC) shown below are examples only. You can configure the port value for either protocol in the Worker. Ensure your OTel exporters match the port value you choose.</a></div>

{{< tabs >}}
{{% tab "Logs" %}}

### HTTP configuration example

The Worker exposes the HTTP endpoint on port 4318, which is the default port. You can configure the port value in the Worker.

For example, to configure an OTel log exporter over HTTP in Python:

```python
    from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter
    http_exporter = OTLPLogExporter(
        endpoint="http://worker:4318/v1/logs"
    )
```

### gRPC configuration example

The Worker exposes the gRPC endpoint on port 4317, which is the default port. You can configure the port value in the Worker.

For example, to configure an OTel log exporter over gRPC in Python:

```python
    from opentelemetry.exporter.otlp.proto.grpc._log_exporter import OTLPLogExporter
    grpc_exporter = OTLPLogExporter(
        endpoint="grpc://worker:4317"
    )
```

Set the listener address environment variables to the following default values. If you configured different port values in the Worker, use those instead.

- HTTP listener address: `worker:4318`
- gRPC listener address: `worker:4317`

{{% /tab %}}

{{% tab "Metrics" %}}

### HTTP configuration example

The Worker exposes the HTTP endpoint on port 4318, which is the default port. You can configure the port value in the Worker.

For example, to configure an OTel metric exporter over HTTP in Python:

```python
    from opentelemetry.exporter.otlp.proto.http.metric_exporter import OTLPMetricExporter
    http_exporter = OTLPMetricExporter(
        endpoint="http://worker:4318/v1/metrics"
    )
```

### gRPC configuration example

The Worker exposes the gRPC endpoint on port 4317, which is the default port. You can configure the port value in the Worker.

For example, to configure an OTel metric exporter over gRPC in Python:

```python
    from opentelemetry.exporter.otlp.proto.grpc.metric_exporter import OTLPMetricExporter
    grpc_exporter = OTLPMetricExporter(
        endpoint="grpc://worker:4317"
    )
```

Set the listener address environment variables to the following default values. If you configured different port values in the Worker, use those instead.

- HTTP listener address: `worker:4318`
- gRPC listener address: `worker:4317`

{{% /tab %}}
{{< /tabs >}}

## Send data from the Datadog Distribution of OpenTelemetry Collector to Observability Pipelines

{{< tabs >}}
{{% tab "Logs" %}}

To send logs from the Datadog Distribution of the OpenTelemetry (DDOT) Collector:
1. Deploy the DDOT Collector using Helm. See [Install the DDOT Collector as a Kubernetes DaemonSet][5] for instructions.
1. [Set up a pipeline][6] on Observability Pipelines using the [OpenTelemetry source](#set-up-the-source-in-the-pipeline-ui).
    1. (Optional) Datadog recommends adding an [Edit Fields processor][7] to the pipeline that appends the field `op_otel_ddot:true`.
    1. When you install the Worker, for the OpenTelemetry source environment variables:
        1. Set your HTTP listener to `0.0.0.0:4318`.
        1. Set your gRPC listener to `0.0.0.0:4317`.
    1. After you install the Worker and deployed the pipeline, update the OpenTelemetry Collector's [`otel-config.yaml`][9] to include an exporter that sends logs to Observability Pipelines. For example:
        ```
        exporters:
            otlphttp:
                endpoint: http://opw-observability-pipelines-worker.default.svc.cluster.local:4318
        ...
        service:
            pipelines:
                logs:
                    exporters: [otlphttp]
        ```
    1. Redeploy the Datadog Agent with the updated [`otel-config.yaml`][9]. For example, if the Agent is installed in Kubernetes:
        ```
        helm upgrade --install datadog-agent datadog/datadog \
        --values ./agent.yaml \
        --set-file datadog.otelCollector.config=./otel-config.yaml
        ```

**Notes**:
- Because DDOT is sending logs to Observability Pipelines, and not the Datadog Agent, the following settings do not work for sending logs from DDOT to Observability Pipelines:
    - `DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_ENABLED`
    - `DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_URL`
- Logs sent from DDOT might have nested objects that prevent Datadog from parsing the logs correctly. To resolve this, Datadog recommends using the [Custom Processor][8] to flatten the nested `resource` object.

[5]: /opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=datadogoperator
[6]: /observability_pipelines/configuration/set_up_pipelines/
[7]: /observability_pipelines/processors/edit_fields#add-field
[8]: /observability_pipelines/processors/custom_processor
[9]: https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=helm#configure-the-opentelemetry-collector

{{% /tab %}}

{{% tab "Metrics" %}}

To send metrics from the Datadog Distribution of the OpenTelemetry (DDOT) Collector:
1. Deploy the DDOT Collector using Helm. See [Install the DDOT Collector as a Kubernetes DaemonSet][5] for instructions.
1. [Set up a pipeline][6] on Observability Pipelines using the [OpenTelemetry source](#set-up-the-source-in-the-pipeline-ui).
    1. (Optional) Datadog recommends adding an [Edit Fields processor][7] to the pipeline that appends the field `op_otel_ddot:true`.
    1. When you install the Worker, for the OpenTelemetry source environment variables:
        1. Set your HTTP listener to `0.0.0.0:4318`.
        1. Set your gRPC listener to `0.0.0.0:4317`.
    1. After you install the Worker and deployed the pipeline, update the OpenTelemetry Collector's [`otel-config.yaml`][9] to include an exporter that sends metrics to Observability Pipelines. For example:
        ```
        exporters:
            otlphttp:
                endpoint: http://opw-observability-pipelines-worker.default.svc.cluster.local:4318
        ...
        service:
            pipelines:
                metrics:
                    exporters: [otlphttp]
        ```
    1. Redeploy the Datadog Agent with the updated [`otel-config.yaml`][9]. For example, if the Agent is installed in Kubernetes:
        ```
        helm upgrade --install datadog-agent datadog/datadog \
        --values ./agent.yaml \
        --set-file datadog.otelCollector.config=./otel-config.yaml
        ```

**Notes**:
- Because DDOT is sending metrics to Observability Pipelines, and not the Datadog Agent, the following settings do not work for sending metrics from DDOT to Observability Pipelines:
    - `DD_OBSERVABILITY_PIPELINES_WORKER_METRICS_ENABLED`
    - `DD_OBSERVABILITY_PIPELINES_WORKER_METRICS_URL`
- Metrics sent from DDOT might have nested objects that prevent Datadog from parsing the metrics correctly. To resolve this, Datadog recommends using the [Custom Processor][8] to flatten the nested `resource` object.

[5]: /opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=datadogoperator
[6]: /observability_pipelines/configuration/set_up_pipelines/
[7]: /observability_pipelines/processors/edit_fields#add-field
[8]: /observability_pipelines/processors/custom_processor
[9]: https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=helm#configure-the-opentelemetry-collector

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/collector/
[2]: /observability_pipelines/sources/
[3]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/#bootstrap-options
[4]: /observability_pipelines/sources/splunk_hec/#send-logs-from-the-splunk-distributor-of-the-opentelemetry-collector-to-observability-pipelines
[5]: /opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=datadogoperator
[6]: /observability_pipelines/configuration/set_up_pipelines/
[7]: /observability_pipelines/processors/edit_fields#add-field
[8]: /observability_pipelines/processors/custom_processor
[9]: https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=helm#configure-the-opentelemetry-collector
[10]: https://app.datadoghq.com/observability-pipelines
[11]: /api/latest/observability-pipelines/
[12]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline