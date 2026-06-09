---
title: Serverless
further_reading:
  - link: "/opentelemetry/setup/otlp_ingest/"
    tag: "Documentation"
    text: "Datadog OTLP Intake Endpoint"
  - link: "/serverless/"
    tag: "Documentation"
    text: "Datadog Serverless Monitoring"
---

<!-- TODO: This page documents the traces intake endpoint, which _index.md labels as Preview. Add a Preview callout or sign-up link so these pages don't contradict each other at publish time. -->
<!-- TODO: Confirm scope — is this traces-only, or should it cover metrics/logs too? Resource attributes (cloud.provider, cloud.platform, etc.) are set at the SDK level and apply to all signals, not just traces. -->

## Overview

Datadog's OTLP traces intake endpoint accepts traces from serverless workloads directly through HTTP/protobuf, without requiring a [Datadog Agent][1]. This page covers traces only. For metrics and logs from serverless environments, see the [OTLP logs][3] and [OTLP metrics][4] intake endpoints. For workloads on third-party managed platforms (Cloudflare, Vercel, Heroku, and others) that use dedicated OTLP subdomains, see [Managed platforms][5].

Supported platforms:

- **AWS**: Lambda, ECS Fargate
- **Azure**: Container Apps, Web Apps (App Service), Azure Functions
<!-- TODO: GKE is not serverless. Either add a sentence explaining this page covers cloud-managed environments where running an Agent is impractical (not only serverless), or move GKE guidance elsewhere. -->
- **GCP**: Cloud Run, Cloud Run Functions, GKE

<div class="alert alert-info">For production workloads that need buffering, retry logic, and centralized sampling, consider using an <a href="/opentelemetry/setup/collector_exporter/">OpenTelemetry Collector</a> instead of direct ingest.</div>

## Prerequisites

The following configuration applies to all platforms.

**Protocol**: `http/protobuf` only. `grpc` and `http/json` are not supported.

**Required headers**:

- `dd-api-key`: Your Datadog API key.
- `dd-otlp-source`: Set to `serverless`.

To enable [trace metrics][2], add `compute_stats=true` to your headers.

**Service name**: Set `OTEL_SERVICE_NAME` to identify your service. Without it, traces appear as `unknown_service`.

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="{{< region-param key="otlp_trace_endpoint" >}}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-service"
```

## Setup

Select your cloud provider for platform-specific resource attribute configuration:

{{< tabs >}}
{{% tab "AWS" %}}

### Lambda

The [AWS Distro for OpenTelemetry (ADOT) Lambda layer][100] provides automatic instrumentation and resource detection for Lambda functions.

Add the ADOT layer to your Lambda function and configure the following environment variables:

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="{{< region-param key="otlp_trace_endpoint" >}}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-lambda-function"
```

The ADOT layer handles resource attribute detection automatically. To set resource attributes manually, `cloud.provider` and `faas.id` (a parseable Lambda ARN) are required:

```shell
export OTEL_RESOURCE_ATTRIBUTES="cloud.provider=aws,faas.id=arn:aws:lambda:us-east-1:123456789012:function:my-function"
```

If `faas.id` is not set, add `cloud.platform=aws_lambda` so Datadog can identify the platform.

| Attribute | Required | Description |
|---|---|---|
| `cloud.provider` | Yes | Set to `aws` |
| `faas.id` | Yes | Lambda function ARN |
| `cloud.platform` | Conditional | Set to `aws_lambda` if `faas.id` is not set |
| `cloud.region` | No | AWS region |
| `faas.name` | No | Function name |
| `faas.version` | No | Function version |
| `faas.instance` | No | Instance identifier |
| `faas.max_memory` | No | Max memory configured (bytes) |

### ECS Fargate

ECS Fargate identification is driven by the task ARN and launch type, not by `cloud.provider` or `cloud.platform`. Configure the OpenTelemetry SDK to export traces directly from your ECS task:

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="{{< region-param key="otlp_trace_endpoint" >}}"
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

[100]: https://aws-otel.github.io/docs/getting-started/lambda

{{% /tab %}}
{{% tab "Azure" %}}

<div class="alert alert-warning">No OpenTelemetry mode automatically populates <code>cloud.*</code> attributes in Azure serverless environments. The Azure Resource Detection Processor only supports VMs. Set <code>cloud.provider</code>, <code>cloud.platform</code>, and <code>cloud.resource_id</code> manually for all Azure platforms.</div>

### Container Apps

Azure provides a built-in OpenTelemetry agent for Container Apps. Configure the exporter and set resource attributes manually. The Azure Resource Detector SDK package does **not** support Container Apps.

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="{{< region-param key="otlp_trace_endpoint" >}}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-container-app"
export OTEL_RESOURCE_ATTRIBUTES="cloud.provider=azure,cloud.platform=azure.container_apps,cloud.resource_id=/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.App/containerApps/{appName}"
```

### Web Apps (App Service)

Use the Azure Resource Detector SDK package (which supports Web Apps) or set `OTEL_RESOURCE_ATTRIBUTES` manually:

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="{{< region-param key="otlp_trace_endpoint" >}}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-web-app"
export OTEL_RESOURCE_ATTRIBUTES="cloud.provider=azure,cloud.platform=azure_app_service,cloud.resource_id=/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Web/sites/{appName}"
```

### Azure Functions

Use the Azure Resource Detector SDK package (which supports Functions) or set `OTEL_RESOURCE_ATTRIBUTES` manually:

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="{{< region-param key="otlp_trace_endpoint" >}}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-azure-function"
export OTEL_RESOURCE_ATTRIBUTES="cloud.provider=azure,cloud.platform=azure_functions,cloud.resource_id=/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Web/sites/{functionAppName}"
```

### Resource attributes reference

| Platform | `cloud.provider` | `cloud.platform` | `cloud.resource_id` |
|---|---|---|---|
<!-- TODO: Verify Azure cloud.platform values against OTel semantic conventions. OTel semconv may use azure.app_service and azure.functions (dot-separated) rather than underscores. Also confirm whether Azure Functions cloud.resource_id should identify the specific function, not just the function app. -->
| Container Apps | `azure` | `azure.container_apps` | `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.App/containerApps/{appName}` |
| Web Apps | `azure` | `azure_app_service` | `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Web/sites/{appName}` |
| Azure Functions | `azure` | `azure_functions` | `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Web/sites/{functionAppName}` |

<div class="alert alert-info"><code>cloud.platform</code> values are intentionally inconsistent across Azure services. Container Apps uses <code>azure.container_apps</code> (dot-separated), while Web Apps and Functions use underscores.</div>

{{% /tab %}}
{{% tab "GCP" %}}

GCP resource detection works automatically with the GCP Resource Detector SDK package. Add it to your application dependencies to populate resource attributes without manual configuration.

### Cloud Run and Cloud Run Functions

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="{{< region-param key="otlp_trace_endpoint" >}}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-cloud-run-service"
```

The GCP Resource Detector SDK automatically populates: `cloud.account.id`, `cloud.platform`, `cloud.provider`, `cloud.region`, `faas.id`, `faas.instance`, `faas.name`, `faas.version`.

### GKE

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="{{< region-param key="otlp_trace_endpoint" >}}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-gke-service"
```

The GCP Resource Detector SDK automatically populates: `cloud.account.id`, `cloud.platform`, `cloud.provider`, `cloud.region`, `host.id`, `k8s.cluster.name`.

### Resource attributes reference

| Platform | Attributes populated by GCP Resource Detector |
|---|---|
| Cloud Run / Cloud Run Functions | `cloud.account.id`, `cloud.platform`, `cloud.provider`, `cloud.region`, `faas.id`, `faas.instance`, `faas.name`, `faas.version` |
| GKE | `cloud.account.id`, `cloud.platform`, `cloud.provider`, `cloud.region`, `host.id`, `k8s.cluster.name` |

{{% /tab %}}
{{< /tabs >}}

<!-- TODO: Eng raised concern about documenting dd-otlp-span-mapping while operation name v2 is still stabilizing. Keep or remove this section pending eng decision. -->
## (Optional) Map or filter spans

Use the `dd-otlp-span-mapping` header to configure span mapping and filtering. The header accepts a JSON value with the following fields:

- `ignore_resources`: A list of regular expressions to disable traces based on their resource name.
- `span_name_remappings`: A map of Datadog span names to preferred names.
- `span_name_as_resource_name`: Specifies whether to use the OpenTelemetry span name as the Datadog span operation name (default: `true`). If `false`, the operation name is derived from a combination of the instrumentation scope name and span kind.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/otlp_ingest_in_the_agent/
[2]: /tracing/metrics/
[3]: /opentelemetry/setup/otlp_ingest/logs/
[4]: /opentelemetry/setup/otlp_ingest/metrics/
[5]: /opentelemetry/setup/otlp_ingest/managed_platforms/
