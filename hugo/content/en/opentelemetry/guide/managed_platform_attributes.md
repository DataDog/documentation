---
title: Recommended OpenTelemetry Attributes for Managed Platforms
description: Guidance for managed platform providers that export OpenTelemetry telemetry to Datadog on behalf of their customers. Learn which resource and span attributes to set so service, environment, version, and trace-log-metric correlation work in Datadog.
further_reading:
  - link: "/opentelemetry/setup/otlp_ingest/managed_platforms/"
    tag: "Documentation"
    text: "OTLP Intake for Managed Platforms"
  - link: "/getting_started/tagging/unified_service_tagging/#opentelemetry"
    tag: "Documentation"
    text: "Unified Service Tagging with OpenTelemetry"
  - link: "/opentelemetry/mapping/semantic_mapping/"
    tag: "Documentation"
    text: "OpenTelemetry Semantic Conventions and Datadog Conventions"
  - link: "/opentelemetry/config/hostname_tagging/"
    tag: "Documentation"
    text: "Hostname and Tagging"
  - link: "https://opentelemetry.io/docs/specs/semconv/"
    tag: "External Site"
    text: "OpenTelemetry Semantic Conventions"
---

<!-- DRAFT: Items marked [NEEDS CONFIRMATION] are unverified and must be resolved before publishing. -->

## Overview

This guide is for managed platform providers: services that run customer code without exposing hosts to the customer, such as hosting, edge compute, serverless application, and workflow platforms. These platforms export OpenTelemetry (OTel) traces, metrics, or logs to Datadog on behalf of their customers. For the platforms that have a dedicated Datadog endpoint, see [Supported platforms][16].

This guide describes the resource and span attributes your platform should set by default so that your customers' telemetry appears correctly in Datadog.

When your platform sets these attributes, your customers get the following without extra configuration:

- Services named and grouped correctly in APM and the [Catalog][1].
- Filtering by environment and comparing by version through [Unified Service Tagging][2].
- Traces linked to the logs and metrics that the same request produced.
- No phantom hosts in the [Infrastructure List][3].

This guide follows the [OpenTelemetry semantic conventions][4]. Datadog maps a subset of those conventions to Datadog tags. For the full mapping, see [OpenTelemetry Semantic Conventions and Datadog Conventions][5].

<div class="alert alert-info">This guide assumes your platform sends telemetry to its dedicated Datadog OTLP endpoint, <code>https://{platform}.integrations.otlp.{{< region-param key="dd_site" >}}</code>. To set up an endpoint, see <a href="/opentelemetry/setup/otlp_ingest/managed_platforms/">OTLP Intake for Managed Platforms</a>.</div>

## Principles

Apply these principles to every attribute in this guide:

1. **Follow OTel semantic conventions first.** Use a standard attribute when one exists. Datadog maps standard attributes to Datadog tags automatically.
2. **Let customers override your defaults.** Treat every value you set as a default. If a customer sets `OTEL_SERVICE_NAME`, `OTEL_RESOURCE_ATTRIBUTES`, or attributes in their SDK, their values take precedence over yours.
3. **Describe the customer's workload, not your infrastructure.** Resource attributes identify the customer's application. Don't report the machines, regions, or accounts that your platform runs on internally as if they were the customer's.
4. **Use the same resource attributes on every signal.** Traces, metrics, and logs from the same workload must carry identical `service.name`, `deployment.environment.name`, and `service.version` values. Datadog correlates signals by these values.
5. **Namespace platform-specific attributes.** For data that has no semantic convention, use a prefix that matches your platform name (for example, `<platform>.deployment.id`). Don't use Datadog-reserved attribute names. See [Attributes to avoid](#attributes-to-avoid).

## Attribute summary

| Attribute | Level | Datadog tag | What breaks in Datadog if it's missing or wrong |
|---|---|---|---|
| `service.name` | Required | `service` | Spans appear under `unknown_service` (or `unknown_service:<process>`). Unrelated applications merge into one service. |
| `deployment.environment.name` | Required | `env` | Customers can't filter by environment. Production and preview traffic mix in service pages, monitors, and trace metrics. |
| `service.version` | Recommended | `version` | [Deployment Tracking][6] and version comparison don't work. |
| `service.instance.id` | Recommended | None by default [NEEDS CONFIRMATION] | Customers can't tell instances apart when investigating one bad instance. |
| `cloud.provider` | Conditional | `cloud_provider` | See [Platform identification](#platform-identification). Setting the wrong value can create incorrect hosts. |
| `cloud.region` | Recommended | `region` | Customers can't filter or group by region. |
| `host.name`, `host.id` | Avoid | `host` | Setting these creates hosts in Datadog for ephemeral or shared infrastructure, and those hosts count toward the customer's host usage. See [Hosts](#hosts). |
| Span `kind` | Required | — | Spans with the wrong kind don't produce [trace metrics][7], and services can be missing from service pages. |
| `http.request.method`, `http.route`, `http.response.status_code` | Required on HTTP spans | `http.method`, `http.route`, `http.status_code` | Operation and resource names fall back to generic values, and endpoint-level views lose detail. |
| Log record `TraceId` and `SpanId` | Required on logs emitted during a request | `trace_id`, `span_id` | Logs don't link to traces. |

The rest of this guide describes each attribute in detail.

## Resource attributes

### Unified service tagging attributes

Datadog uses three reserved tags, `service`, `env`, and `version`, to connect telemetry across products. Datadog derives these tags from the following OTel resource attributes. For more information, see [Unified Service Tagging][2].

#### `service.name`

**Set to**: The name the customer gave their project or application on your platform. Use the same value for every instance and deployment of that application.

**Customer override**: `OTEL_SERVICE_NAME` or `service.name` in `OTEL_RESOURCE_ATTRIBUTES`. If both are set, `OTEL_SERVICE_NAME` takes precedence.

**What breaks if missing**: OTel SDKs default to `unknown_service` or `unknown_service:<process name>`. In Datadog, every application that uses the default appears as one service, so customers can't separate their applications in APM, the Catalog, or monitors.

**Avoid**:
- Including deployment IDs, commit hashes, or instance IDs in `service.name`. Each new value creates a new service in Datadog, and service history resets on every deploy.
- Using your platform's name as the service name, including for telemetry your platform generates. See [Platform-generated telemetry](#platform-generated-telemetry).

#### `deployment.environment.name`

**Set to**: The customer's environment. The OTel semantic conventions define four well-known values, `production`, `staging`, `development`, and `test`, and require them when one applies. For any other environment, such as a preview or branch deployment, use your platform's own environment name.

| Platform concept | Value |
|---|---|
| Production deployment | `production` |
| Staging deployment | `staging` |
| Development deployment | `development` |
| Test deployment | `test` |
| Other environments, such as preview deployments | Your platform's environment name (for example, `preview`) |

**Customer override**: `deployment.environment.name` in `OTEL_RESOURCE_ATTRIBUTES`.

**What breaks if missing**: Telemetry has no `env` tag. Customers can't scope service pages, monitors, or SLOs to production, and preview traffic skews production latency and error rates.

**Note**: `deployment.environment.name` replaces the deprecated `deployment.environment` attribute. Datadog supports both and maps either one to `env`. Set `deployment.environment.name`.

#### `service.version`

**Set to**: An identifier for the deployed code that changes on every deploy. Use, in order of preference:

1. A release version the customer defines.
2. The Git commit SHA of the deployed code.
3. Your platform's release or deployment version.

**Customer override**: `service.version` in `OTEL_RESOURCE_ATTRIBUTES`.

**What breaks if missing**: Telemetry has no `version` tag. [Deployment Tracking][6] can't compare error rates and latency across deploys, and customers can't connect a regression to the deploy that caused it.

### Service instance

#### `service.instance.id`

**Set to**: A unique ID for each running instance of the customer's application (for example, a container, worker, or isolate ID). Follow the OTel guidance: use a random UUID, or derive a UUID v5 from a stable instance identifier.

**What breaks if missing**: Datadog doesn't require this attribute. Without it, customers can't isolate a single misbehaving instance.

**Avoid**: Reusing `service.instance.id` values across customers or applications, or exposing internal infrastructure names (such as node or pod names) in the value.

[NEEDS VERIFICATION] Whether Datadog maps `service.instance.id` to a tag on traces, metrics, or logs received at the managed platform endpoints. If it becomes a metric tag, it can increase customers' custom metric cardinality.

### Platform identification

Datadog identifies your platform from the dedicated OTLP subdomain your platform sends to. You don't need to set the `dd-otlp-source` header or a custom attribute to identify your platform.

#### `cloud.provider` and `cloud.platform`

Set these attributes only when the [OTel cloud semantic conventions][17] list a well-known value for your platform.

If your platform has no well-known value, leave `cloud.provider` and `cloud.platform` unset. Don't define your own value. Don't report the hyperscaler that your platform runs on internally (for example, `cloud.provider=aws` for a platform that runs on AWS).

**What breaks if set incorrectly**: Datadog uses `cloud.provider` values of `aws`, `gcp`, and `azure` to apply cloud-specific hostname and serverless rules. If your platform reports `cloud.provider=aws` along with host attributes, Datadog can attribute the customer's telemetry to an AWS host that the customer doesn't own. For the resolution rules, see [Mapping OpenTelemetry Semantic Conventions to Hostnames][8].
#### `cloud.region` and `cloud.availability_zone`

**Set to**: The region where the customer's code ran, if the customer chose it or it affects their workload (for example, a function region). Use your platform's region identifier.

**Datadog tag**: `region` and `zone`.

**What breaks if missing**: Customers can't filter or group by region. This attribute is optional.

For platforms that run code at many edge locations per request, [NEEDS CONFIRMATION] whether to set `cloud.region` to the edge location. High-cardinality region values increase metric cardinality.

#### Platform-specific attributes

For platform data that has no semantic convention, use attributes namespaced with your platform name. Useful examples include:

- Deployment ID (for example, `<platform>.deployment.id`)
- Project or application ID (for example, `<platform>.project.id`)
- Runtime type (for example, `<platform>.runtime` with values like `edge` or `nodejs`)

Datadog doesn't map these attributes to tags by default. Customers can search for them on spans and logs as attributes.

### Source code metadata

[NEEDS CONFIRMATION] To link traces to source code through the [Source Code Integration][9], confirm which attributes Datadog reads from OTLP data at the managed platform endpoints: the OTel VCS conventions (`vcs.ref.head.revision`, `vcs.repository.url.full`) or the Datadog attributes (`git.commit.sha`, `git.repository_url`). After confirmation, recommend that platforms with Git-based deploys set them.

### Hosts

Managed platforms are hostless from the customer's point of view. Don't set the following attributes on customer telemetry:

- `host.name`
- `host.id`
- `k8s.node.name`
- `host` or `datadog.host.name`

**What breaks if set**: Datadog uses these attributes to [resolve a hostname][8]. Ephemeral or shared machines then appear as hosts that the customer doesn't manage. Hosts that come and go with each instance clutter the Infrastructure List, and host-level tags attach to the wrong telemetry. These hosts also count toward the customer's Infrastructure Monitoring host usage, which can result in unexpected charges for your customers.

Datadog discards values like `localhost` and `127.0.0.1` as invalid hostnames, so default SDK values don't create hosts.

## Span attributes

### Span kind

Set the span kind correctly on every span your platform creates or forwards:

| Span | Kind |
|---|---|
| Inbound request handled by the customer's code | `SERVER` |
| Outbound HTTP, database, or API call | `CLIENT` |
| Message published to a queue | `PRODUCER` |
| Message consumed from a queue, cron, or scheduled trigger | `CONSUMER` [NEEDS CONFIRMATION for cron and scheduled triggers] |
| Work inside the request | `INTERNAL` |

**What breaks if wrong**: Datadog treats root, `SERVER`, and `CONSUMER` spans as [service entry spans][10] and computes trace metrics on service entry spans and on `CLIENT` and `PRODUCER` spans. `INTERNAL` spans don't generate trace metrics. If every span is `INTERNAL`, the customer's service has no request, error, or latency metrics. Datadog computes trace metrics at the managed platform endpoint by default.

### HTTP spans

On `SERVER` and `CLIENT` spans for HTTP requests, set the stable HTTP semantic conventions:

| Attribute | Datadog attribute | Notes |
|---|---|---|
| `http.request.method` | `http.method` | Required. Determines the operation name (`http.server.request` or `http.client.request`). |
| `http.route` | `http.route` | Set on `SERVER` spans when your platform knows the route template (for example, `/users/[id]`). Don't use the raw path. [NEEDS CONFIRMATION] how the managed platform endpoints build the resource name from `http.route`. |
| `http.response.status_code` | `http.status_code` | Required. |
| `url.full` | `http.url` | Set on `CLIENT` spans. Remove credentials and sensitive query parameters. |
| `server.address` | `http.server_name` | Recommended. |
| `client.address` | `http.client_ip` | Optional. Consider your customers' privacy requirements. |
| `user_agent.original` | `http.useragent` | Optional. |

**What breaks if missing**: Without `http.request.method`, Datadog can't name the operation for the span. Without `http.route`, all requests to a service group under a few generic resource names, and customers lose per-endpoint latency and error metrics.

### Errors

Set the span status to `ERROR` when the request fails, following the OTel HTTP conventions (for example, `5xx` responses on `SERVER` spans). Record exceptions as span events with `exception.type`, `exception.message`, and `exception.stacktrace`.

**What breaks if missing**: Datadog doesn't count the span as an error. Error rates, error monitors, and [Error Tracking][11] miss the failure. [NEEDS CONFIRMATION] whether Datadog also marks a span as an error from `http.response.status_code` alone when the status is unset.

### Function and trigger spans

If your platform invokes customer code as functions, set the [FaaS semantic conventions][12] on the invocation span:

- `faas.trigger`: The trigger type, such as `http`, `pubsub`, `timer`, or `other`. Datadog uses it to name `SERVER` spans `<trigger>.invoke` when no HTTP attributes are present.
- `faas.invocation_id`: The invocation ID.
- `faas.coldstart`: `true` on the first invocation of a new instance.

### Database and messaging spans

On spans for platform-managed databases, caches, or queues, set `db.system.name` (or `db.system`) and `messaging.system` with `messaging.operation.type`. Datadog uses these attributes to set the span type and operation name, and to show the dependency in the service map. [NEEDS CONFIRMATION] whether Datadog span type and operation name mapping reads the newer `db.system.name` attribute in addition to `db.system`.

## Trace context

Most trace correlation failures on managed platforms come from broken context propagation, not missing attributes.

- **Propagate W3C Trace Context.** Accept an incoming `traceparent` header and pass it to the customer's code, so platform spans and customer spans share one trace ID.
- **Parent customer spans to your platform span.** If your platform creates an edge or router span, make it the parent of the customer's `SERVER` span. Don't start a new root trace inside the customer's code.
- **Preserve the sampling decision.** If your platform samples traces before export, keep the sampled flag consistent across platform and customer spans, so traces are complete or absent, never partial.

**What breaks if missing**: Requests appear as several disconnected traces, the service map misses the dependency between your platform and the customer's service, and logs link to only part of a request.

### Sampling

Datadog computes trace metrics from the spans it receives. If your platform samples before export, request counts and error counts in Datadog are lower than the real values. [NEEDS VERIFICATION] Whether the managed platform endpoints read the OTel sampling threshold in `tracestate` to adjust trace metrics for sampling. Until confirmed, document your sampling rate for customers, and export unsampled spans if your platform supports it.

## Platform-generated telemetry

Your platform can generate telemetry about a customer's workload that doesn't come from the customer's code, such as edge proxy or router spans, and build, deploy, or request access logs. Send this telemetry with the customer's resource attributes, including `service.name`, `deployment.environment.name`, and `service.version`. Don't use a separate service name for your platform.

Use standard OTel semantic conventions to show that the telemetry comes from your platform, not the customer's code:

- **Instrumentation scope**: Emit platform spans and logs from a tracer or logger whose instrumentation scope name identifies your platform component (for example, `<platform>.edge`), and set the scope version. The instrumentation scope is the OTel mechanism for identifying the library that produced telemetry.
- **Span kind and HTTP attributes**: Model a proxy as the HTTP semantic conventions describe: a `SERVER` span for the inbound request and a `CLIENT` span for the request your platform forwards to the customer's code. The customer's `SERVER` span is a child of your `CLIENT` span.
- **Log event names**: For logs that describe a defined event, set the log record `EventName` when an OTel semantic convention defines one.

[NEEDS VERIFICATION] How Datadog displays the instrumentation scope name on spans and logs, and whether customers can search and filter by it.

[NEEDS VERIFICATION] Whether a platform `SERVER` span and a customer `SERVER` span in the same service and trace both count as service entry spans. If they do, request counts in trace metrics for that service double.

## Logs

Send customer logs as OTLP log records with the same resource attributes as the traces from the same workload.

| Field | Set to | What breaks if missing |
|---|---|---|
| Resource `service.name`, `deployment.environment.name`, `service.version` | Same values as on traces | Logs don't correlate to traces or service pages. |
| Log record `TraceId` and `SpanId` | The active span when the log was emitted | Logs don't appear on the trace, and the trace doesn't appear on the log. |
| `SeverityNumber` and `SeverityText` | The log level | Datadog can't set log status, so customers can't filter by level. |
| Body | The log message. Structured JSON bodies are parsed into attributes. | — |

Set `TraceId` and `SpanId` in the log record fields, not as attributes or inside the message text. For setup details, see [Correlate OpenTelemetry Traces and Logs][13].

For build, deploy, and access logs that your platform generates, see [Platform-generated telemetry](#platform-generated-telemetry).

## Metrics

Send customer metrics with the same resource attributes as the traces and logs from the same workload, so customers can pivot from a trace to the related metrics.

- Export metrics with **delta temporality**. Managed platform endpoints don't convert cumulative metrics to delta. See [OTLP Intake for Managed Platforms][14].
- Use [OTel metric semantic conventions][15] for metric names when they exist (for example, `http.server.request.duration`).
- Don't add per-request or per-instance values as metric attributes. Each unique attribute combination creates a new metric timeseries for the customer.

## Multi-tenancy

- Send each customer's telemetry with that customer's Datadog API key, in the `dd-api-key` header.
- Don't combine telemetry from more than one customer in a single OTLP export request.
- Don't copy attributes from one customer's resource to another's.

## Attributes to avoid

Don't set the following attributes on customer telemetry. Datadog reserves them, and they override the values Datadog derives from OTel conventions. Leave them for customers to set.

| Attribute | Effect in Datadog |
|---|---|
| `operation.name` | Overrides the span operation name. |
| `resource.name` | Overrides the span resource name. |
| `span.type` | Overrides the span type. |
| `host`, `datadog.host.name` | Overrides hostname resolution. See [Hosts](#hosts). |
| `service`, `env`, `version` as resource attributes | [NEEDS CONFIRMATION] Whether these conflict with the OTel-derived tags at the managed platform endpoints. |

## Example

The following example shows the resource attributes a platform sets by default for a customer's production deployment. Customer-provided values in `OTEL_SERVICE_NAME` and `OTEL_RESOURCE_ATTRIBUTES` take precedence.

```shell
# Platform defaults
OTEL_SERVICE_NAME="checkout-web"
OTEL_RESOURCE_ATTRIBUTES="deployment.environment.name=production,service.version=3f9c2ab,service.instance.id=6c1f4b0e-2a7d-4c55-9a43-0d8a6e1b7f21,cloud.region=us-east-1,example_platform.deployment.id=dpl_123,example_platform.project.id=prj_456"
```

The resulting telemetry in Datadog has the tags `service:checkout-web`, `env:production`, `version:3f9c2ab`, and `region:us-east-1`, and no `host` tag.

## Validate your configuration

After you set these attributes, send test telemetry from a sample customer application and check the following in Datadog:

1. In the [Catalog][1], the service appears with the expected name, `env`, and `version`.
2. On the service page, request, error, and latency metrics appear for the service's endpoints.
3. On a trace, platform spans and customer spans share one trace, and the **Logs** tab shows the logs from that request.
4. In the [Infrastructure List][3], no new hosts appear for the customer's workload.
5. After a new deploy, [Deployment Tracking][6] shows the new version.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /internal_developer_portal/catalog/
[2]: /getting_started/tagging/unified_service_tagging/#opentelemetry
[3]: /infrastructure/list/
[4]: https://opentelemetry.io/docs/specs/semconv/
[5]: /opentelemetry/mapping/semantic_mapping/
[6]: /tracing/services/deployment_tracking/
[7]: /tracing/metrics/
[8]: /opentelemetry/mapping/hostname/
[9]: /integrations/guide/source-code-integration/
[10]: /opentelemetry/mapping/service_entry_spans/
[11]: /error_tracking/
[12]: https://opentelemetry.io/docs/specs/semconv/faas/
[13]: /opentelemetry/correlate/logs_and_traces/
[14]: /opentelemetry/setup/otlp_ingest/managed_platforms/#limited-normalization
[15]: https://opentelemetry.io/docs/specs/semconv/general/metrics/
[16]: /opentelemetry/setup/otlp_ingest/managed_platforms/#supported-platforms
[17]: https://opentelemetry.io/docs/specs/semconv/registry/attributes/cloud/
