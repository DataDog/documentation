---
title: OTLP Intake for Serverless
description: Send traces from AWS Lambda, ECS Fargate, Azure Functions, Cloud Run, and other serverless platforms directly to Datadog without a Datadog Agent or Collector.
further_reading:
  - link: "/opentelemetry/setup/otlp_ingest/"
    tag: "Documentation"
    text: "Datadog OTLP Intake Endpoint"
  - link: "/serverless/"
    tag: "Documentation"
    text: "Datadog Serverless Monitoring"
---

## Overview

Send traces from serverless workloads directly to Datadog over HTTP/protobuf, without requiring a [Datadog Agent][1] or OpenTelemetry Collector. If your platform appears in the [Managed platforms][5] table, use its dedicated endpoint instead.

Serverless workloads can also send logs and metrics through the general [OTLP logs][3] and [OTLP metrics][4] intake endpoints. The resource attributes on this page apply to all signals your application exports.

Supported platforms:

- **AWS**: Lambda, ECS Fargate
- **Azure**: Container Apps, Web Apps (App Service), Azure Functions
- **GCP**: Cloud Run, Cloud Run Functions, GKE Autopilot

<div class="alert alert-info">Use direct ingest when running a Collector is impractical (for example, Lambda). If you can run a Collector, see <a href="/opentelemetry/setup/collector_exporter/">OpenTelemetry Collector</a> for metadata enrichment, normalization, and centralized sampling.</div>

## Prerequisites

The following configuration applies to all platforms.

**Protocol**: `http/protobuf` or `http/json`. `grpc` is not supported.

**Required headers**:

- `dd-api-key`: Your Datadog API key.
- `dd-otlp-source`: Set to `serverless`.
- `compute_stats`: Set to `true`. Required for [trace metrics][2].

**Service name**: Set `OTEL_SERVICE_NAME` to identify your service. Without it, traces appear as `unknown_service`.

**Resource attributes**: Set platform-specific attributes with `OTEL_RESOURCE_ATTRIBUTES`. See each cloud provider tab below for required and optional attributes.

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="{{< region-param key="otlp_trace_endpoint" >}}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-service"
```

## Setup

<div class="alert alert-info">Based on your <a href="/getting_started/site/">Datadog site</a>, which is {{< region-param key=dd_datacenter code="true" >}}: Replace <code>${YOUR_ENDPOINT}</code> with {{< region-param key="otlp_trace_endpoint" code="true" >}} in the following examples.</div>

Select your cloud provider for platform-specific resource attribute configuration:

{{< tabs >}}
{{% tab "AWS" %}}

### Lambda

The [AWS Distro for OpenTelemetry (ADOT) Lambda layer][100] provides automatic instrumentation and resource detection for Lambda functions.

Add the ADOT layer to your Lambda function and configure the following environment variables:

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-lambda-function"
```

The ADOT layer handles resource attribute detection automatically. If you are not using ADOT, set resource attributes manually. `cloud.provider` is required. Set `faas.id` (a parseable Lambda ARN) for full platform identification; if `faas.id` is not available, set `cloud.platform=aws_lambda` instead:

```shell
export OTEL_RESOURCE_ATTRIBUTES="cloud.provider=aws,faas.id=arn:aws:lambda:us-east-1:123456789012:function:my-function"
```

| Attribute | Required | Description |
|---|---|---|
| `cloud.provider` | Yes | Set to `aws` |
| `faas.id` | Recommended | Lambda function ARN (preferred for platform identification) |
| `cloud.platform` | Conditional | Set to `aws_lambda` if `faas.id` is not set |
| `cloud.region` | No | AWS region |
| `faas.name` | No | Function name |
| `faas.version` | No | Function version |
| `faas.instance` | No | Instance identifier |
| `faas.max_memory` | No | Max memory configured (bytes) |
| `aws.log.group.names` | No | CloudWatch log group names (enables trace-log correlation) |
| `aws.log.stream.names` | No | CloudWatch log stream names |

### ECS Fargate

ECS Fargate identification is driven by the task ARN and launch type, not by `cloud.provider` or `cloud.platform`. Configure the OpenTelemetry SDK to export traces directly from your ECS task:

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-ecs-service"
export OTEL_RESOURCE_ATTRIBUTES="aws.ecs.task.arn=arn:aws:ecs:us-east-1:123456789012:task/my-cluster/1234567890abcdef,aws.ecs.launchtype=fargate"
```

| Attribute | Required | Description |
|---|---|---|
| `aws.ecs.task.arn` | Yes | ECS task ARN |
| `aws.ecs.launchtype` | Yes | Set to `fargate` (case-insensitive) |
| `cloud.provider` | No | Defaults to `aws` |
| `cloud.platform` | No | Defaults to `aws_ecs` |
| `cloud.region` | No | AWS region |
| `cloud.availability_zone` | No | Availability zone |
| `aws.ecs.cluster.arn` | No | Cluster ARN |
| `aws.ecs.task.family` | No | Task definition family |
| `aws.ecs.task.id` | No | Task ID |
| `aws.ecs.task.revision` | No | Task definition revision |
| `aws.log.group.names` | No | CloudWatch log group names (enables trace-log correlation) |
| `aws.log.stream.names` | No | CloudWatch log stream names |

[100]: https://aws-otel.github.io/docs/getting-started/lambda

{{% /tab %}}
{{% tab "Azure" %}}

<div class="alert alert-warning">The OpenTelemetry Collector's Azure resource detection processor only supports VMs. SDK-level Azure resource detectors support some platforms (Web Apps, Functions), but coverage varies by language SDK. Set <code>cloud.provider</code>, <code>cloud.platform</code>, and <code>cloud.resource_id</code> manually as the reliable path for all Azure serverless platforms.</div>

### Container Apps

Azure resource detector support for Container Apps varies by language SDK. Set resource attributes manually:

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-container-app"
export OTEL_RESOURCE_ATTRIBUTES="cloud.provider=azure,cloud.platform=azure.container_apps,cloud.resource_id=/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.App/containerApps/{appName}"
```

### Web Apps (App Service)

Use the Azure resource detector SDK package (coverage varies by language SDK) or set `OTEL_RESOURCE_ATTRIBUTES` manually:

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-web-app"
export OTEL_RESOURCE_ATTRIBUTES="cloud.provider=azure,cloud.platform=azure.app_service,cloud.resource_id=/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Web/sites/{appName}"
```

### Azure Functions

Use the Azure resource detector SDK package (coverage varies by language SDK) or set `OTEL_RESOURCE_ATTRIBUTES` manually:

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-azure-function"
export OTEL_RESOURCE_ATTRIBUTES="cloud.provider=azure,cloud.platform=azure.functions,cloud.resource_id=/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Web/sites/{functionAppName}"
```

### Resource attributes reference

| Platform | `cloud.provider` | `cloud.platform` | `cloud.resource_id` |
|---|---|---|---|
| Container Apps | `azure` | `azure.container_apps` | `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.App/containerApps/{appName}` |
| Web Apps | `azure` | `azure.app_service` | `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Web/sites/{appName}` |
| Azure Functions | `azure` | `azure.functions` | `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Web/sites/{functionAppName}` |

{{% /tab %}}
{{% tab "GCP" %}}

GCP resource detection works automatically with the GCP Resource Detector SDK package. Add it to your application dependencies to populate resource attributes without manual configuration.

### Cloud Run and Cloud Run Functions

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-cloud-run-service"
```

The GCP Resource Detector SDK automatically populates: `cloud.account.id`, `cloud.platform`, `cloud.provider`, `cloud.region`, `faas.id`, `faas.instance`, `faas.name`, `faas.version`.

### GKE Autopilot

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-gke-service"
```

The GCP Resource Detector SDK automatically populates: `cloud.account.id`, `cloud.platform`, `cloud.provider`, `cloud.region`, `host.id`, `k8s.cluster.name`.

### Resource attributes reference

| Platform | Attributes populated by GCP Resource Detector |
|---|---|
| Cloud Run / Cloud Run Functions | `cloud.account.id`, `cloud.platform`, `cloud.provider`, `cloud.region`, `faas.id`, `faas.instance`, `faas.name`, `faas.version` |
| GKE Autopilot | `cloud.account.id`, `cloud.platform`, `cloud.provider`, `cloud.region`, `host.id`, `k8s.cluster.name` |

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/otlp_ingest_in_the_agent/
[2]: /tracing/metrics/
[3]: /opentelemetry/setup/otlp_ingest/logs/
[4]: /opentelemetry/setup/otlp_ingest/metrics/
[5]: /opentelemetry/setup/otlp_ingest/managed_platforms/
