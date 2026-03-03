---
title: Install the DDOT Collector on EKS Fargate
private: true
# code_lang: eks_fargate
# type: multi-code-lang
# code_lang_weight: 5
further_reading:
- link: "/opentelemetry/setup/ddot_collector/custom_components"
  tag: "Documentation"
  text: "Use Custom OpenTelemetry Components with Datadog Agent"
---

{{< callout header="false" btn_hidden="true">}}
  Support for deploying the DDOT Collector on EKS Fargate is in Preview.
{{< /callout >}}

## Overview

Follow this guide to deploy the Datadog Distribution of OpenTelemetry (DDOT) Collector alongside the Datadog Agent on Amazon EKS Fargate. Because EKS Fargate does not support DaemonSets, the Datadog Agent runs as a sidecar container in each application pod.

<div class="alert alert-info">
  <strong>Need additional OpenTelemetry components?</strong> If you need components beyond those included in the default package, follow <a href="/opentelemetry/setup/ddot_collector/custom_components">Use Custom OpenTelemetry Components</a> to extend the Datadog Agent's capabilities. For a list of components included by default, see <a href="/opentelemetry/agent/#opentelemetry-collector-components">OpenTelemetry Collector components</a>.
</div>

## Requirements

To complete this guide, you need the following:

**Datadog account**:
1. [Create a Datadog account][1] if you don't have one.
1. Find or create your [Datadog API key][2].

**Software**:
- An EKS cluster with a [Fargate profile][3] configured.
- [kubectl][4]

**Network**: {{% otel-network-requirements %}}

## Install the Datadog Agent with OpenTelemetry Collector

<div class="alert alert-info">This installation is required for both Datadog SDK + DDOT and OpenTelemetry SDK + DDOT configurations. While the Datadog SDK implements the OpenTelemetry API, it still requires the DDOT Collector to process and forward OTLP metrics and logs.</div>

### Set up Datadog API key

Store the Datadog API key as a Kubernetes secret:

```shell
kubectl create secret generic datadog-secret \
  --from-literal api-key=<DD_API_KEY>
```

Replace `<DD_API_KEY>` with your actual Datadog API key.

### Add the Datadog Agent sidecar to your pod spec

Add the Datadog Agent as a sidecar container in your application's pod spec. The agent and application containers share the same pod network namespace, so the application sends OTLP data to `localhost`.

<div class="alert alert-info">
  The Datadog Agent image must be <code>public.ecr.aws/datadog/agent:latest-full</code>. The <code>latest-full</code> image includes the DDOT Collector. The standard <code>latest</code> image does not.
</div>

{{< code-block lang="yaml" filename="deployment.yaml" collapsible="true" >}}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: <SERVICE>
spec:
  selector:
    matchLabels:
      app: <SERVICE>
  template:
    metadata:
      labels:
        app: <SERVICE>
    spec:
      containers:
        - name: <SERVICE>
          image: <APP_IMAGE>
          env:
            - name: OTEL_EXPORTER_OTLP_ENDPOINT
              value: "http://localhost:4317"
            - name: OTEL_EXPORTER_OTLP_PROTOCOL
              value: "grpc"
            - name: OTEL_SERVICE_NAME
              value: "<SERVICE>"
            - name: OTEL_RESOURCE_ATTRIBUTES
              value: "service.version=<VERSION>,deployment.environment.name=<ENV>"
        - name: datadog-agent
          image: public.ecr.aws/datadog/agent:latest-full
          env:
            - name: DD_API_KEY
              valueFrom:
                secretKeyRef:
                  name: datadog-secret
                  key: api-key
            - name: DD_SITE
              value: "<DATADOG_SITE>"
            - name: DD_OTELCOLLECTOR_ENABLED
              value: "true"
            - name: DD_EKS_FARGATE
              value: "true"
            - name: DD_LOGS_ENABLED
              value: "true"
            - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
              value: "true"
{{< /code-block >}}

Replace the following placeholders:
- `<SERVICE>`: The name of your service.
- `<APP_IMAGE>`: Your application container image.
- `<VERSION>`: The version of your service.
- `<ENV>`: Your deployment environment (for example, `production`).
- `<DATADOG_SITE>`: Your [Datadog site][5]. Your site is {{< region-param key="dd_site" code="true" >}}. (Ensure the correct **DATADOG SITE** is selected on the right.)

### Configure EKS resource detection

The DDOT Collector's `infraattributes` processor enriches your telemetry with EKS infrastructure tags when Kubernetes resource attributes are present. Add the EKS resource detector to your OpenTelemetry SDK, or configure the `resourcedetection` processor in your collector configuration.

**Using the OpenTelemetry SDK (recommended)**: Add the AWS EKS resource detector to your application. This provides attributes such as `cloud.provider`, `cloud.platform`, `k8s.cluster.name`, and Fargate-specific metadata.

**Using the collector's `resourcedetection` processor**: If you control the collector configuration, add the `eks` and `env` detectors:

{{< code-block lang="yaml" filename="otel-config.yaml" collapsible="true" >}}
processors:
  resourcedetection:
    detectors: [env, eks]
    timeout: 2s
    override: false
{{< /code-block >}}

Add `resourcedetection` to your pipeline processors alongside `infraattributes`:

{{< code-block lang="yaml" filename="otel-config.yaml" collapsible="true" >}}
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [resourcedetection, infraattributes]
      exporters: [datadog, datadog/connector]
    metrics:
      receivers: [otlp, datadog/connector]
      processors: [resourcedetection, infraattributes]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [resourcedetection, infraattributes]
      exporters: [datadog]
{{< /code-block >}}

## Send your telemetry to Datadog

To send your telemetry data to Datadog:

1. [Instrument your application](#instrument-the-application)
2. [Correlate observability data](#correlate-observability-data)
3. [Run your application](#run-the-application)

### Instrument the application

Instrument your application [using the OpenTelemetry API][6].

{{% collapse-content title="Example application instrumented with the OpenTelemetry API" level="p" %}}
As an example, you can use the [Calendar sample application][7] that's already instrumented for you. The following code instruments the [CalendarService.getDate()][8] method using the OpenTelemetry annotations and API:
   {{< code-block lang="java" filename="CalendarService.java" disable_copy="true" collapsible="false" >}}
@WithSpan(kind = SpanKind.CLIENT)
public String getDate() {
    Span span = Span.current();
    span.setAttribute("peer.service", "random-date-service");
    ...
}
{{< /code-block >}}
{{% /collapse-content %}}

### Correlate observability data

[Unified service tagging][9] ties observability data together in Datadog so you can navigate across metrics, traces, and logs with consistent tags.

In containerized environments, set `env`, `service`, and `version` using OpenTelemetry Resource Attributes environment variables. The DDOT Collector detects this tagging configuration and applies it to the data it collects from containers.

The `OTEL_SERVICE_NAME` and `OTEL_RESOURCE_ATTRIBUTES` environment variables in the deployment manifest above configure unified service tagging.

### Run the application

Apply the updated deployment manifest:

```shell
kubectl apply -f deployment.yaml
```

After the updated pods are running, unified service tagging is fully enabled for your metrics, traces, and logs.

### Validate the deployment

1. Verify that all containers in the pod are running:

   ```shell
   kubectl get pods -l app=<SERVICE>

Use Datadog to explore the observability data for your application.

### Logs

View logs to monitor and troubleshoot application and system operations.

{{< img src="/opentelemetry/embedded_collector/logs.png" alt="View logs from the Log Explorer." style="width:100%;" >}}

### Traces

View traces and spans to observe the status and performance of requests processed by your application, with infrastructure metrics correlated in the same trace.

{{< img src="/opentelemetry/embedded_collector/traces.png" alt="View traces from the Trace Explorer." style="width:100%;" >}}

### Runtime metrics

Monitor your runtime (JVM) metrics for your applications.

{{< img src="/opentelemetry/embedded_collector/metrics.png" alt="View JVM metrics from the JVM Metrics dashboard" style="width:100%;" >}}

### Collector health metrics

View metrics from the DDOT Collector to monitor the Collector health.

{{< img src="/opentelemetry/embedded_collector/dashboard.png" alt="View Collector health metrics from the OTel dashboard." style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html
[4]: https://kubernetes.io/docs/tasks/tools/#kubectl
[5]: /getting_started/site
[6]: /tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[7]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar
[8]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/src/main/java/com/otel/service/CalendarService.java#L27-L48
[9]: /getting_started/tagging/unified_service_tagging
