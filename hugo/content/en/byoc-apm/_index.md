---
title: BYOC APM
description: Store and query APM spans in your own AWS account while you use the Datadog APM UI.
private: true
further_reading:
- link: "/byoc-logs/"
  tag: "Documentation"
  text: "BYOC Logs"
- link: "/tracing/"
  tag: "Documentation"
  text: "APM"
- link: "/opentelemetry/"
  tag: "Documentation"
  text: "OpenTelemetry in Datadog"
---

{{< callout url="#" btn_hidden="true" header="BYOC APM is in Preview" >}}
To request access, contact your Datadog account team. Self-service installation isn't available for the Preview.
{{< /callout >}}

## Overview

Bring Your Own Cloud (BYOC) APM runs APM span ingestion, processing, and storage in your own cloud account. You investigate those spans in the Datadog APM UI.

With BYOC APM, you control the infrastructure and the location of your trace data. You use Datadog to search spans, explore services, and monitor application performance.

BYOC APM extends the BYOC offering for logs. For more information, see [BYOC Logs][1].

## Use cases

BYOC APM supports these use cases:

- **Tracing at scale**: If cost limits your tracing coverage or retention, run span processing and storage on your own cloud infrastructure. BYOC APM uses object storage as the durable data layer. You can apply your existing cloud provider commitments to this infrastructure.
- **Data residency and control**: Store trace data in your own cloud account or in a geography that you approve. Use this option when regulations, company policy, or the sensitivity of an application require it.

<div class="alert alert-info">BYOC APM keeps span storage in your cloud account, but some data goes to Datadog. Query results are sent to Datadog for display, and trace metrics, metrics, and profiles are stored in Datadog. Include these data flows in a data residency review, in addition to span storage.</div>

## How it works

BYOC APM has two parts:

- **Data plane**: Runs in your cloud account. It ingests, processes, and stores spans.
- **Control plane and APM UI**: Run in Datadog. The APM UI sends queries to the span storage in your cloud account.

### Components

| Component | Location | Function |
| --- | --- | --- |
| [Datadog Operator][2] | Your Kubernetes cluster | Deploys and upgrades the data plane. |
| OpenTelemetry Collector | Your environment | Sends traces and trace metrics over the OpenTelemetry Protocol (OTLP). |
| [Observability Pipelines][3] Worker | Your cloud account | Receives spans and sends them to the Datadog BYOC Traces destination. Inside this destination, Datadog runs a fixed ingestion pipeline that prepares spans for storage and queries. You can't edit this pipeline. |
| Traces database cluster | Your cloud account | Stores spans in object storage. The cluster is dedicated to traces and is separate from BYOC Logs clusters. |
| Metrics, trace metrics, and profiles | Datadog | Receives trace metrics without processing, and stores metrics and profiles. |
| APM UI and control plane | Datadog | Sends queries to the traces database cluster in your cloud account and displays the results in the APM UI. |

### Data flows

BYOC APM moves data along these paths:

- **Spans**: Your application, instrumented with an OpenTelemetry SDK, sends spans to the OpenTelemetry Collector over OTLP. The Collector sends the spans to the Observability Pipelines Worker, which writes them to the traces database cluster in your cloud account.
- **Trace metrics**: The OpenTelemetry Collector sends [trace metrics][4], including RED metrics (request rate, errors, and latency), to the Observability Pipelines Worker. The Worker sends them to Datadog without processing, so the metrics match the spans stored in your cloud account. Trace metrics supply the data for [service pages][5], [resource pages][6], [Catalog][7] entries, and [monitors on trace metrics][8].
- **Queries**: The APM UI in Datadog queries the traces database cluster in your cloud account. Query results display in Datadog.

### Sampling and span attributes

BYOC APM doesn't sample spans. To control span volume, configure sampling in your OpenTelemetry SDK or in the OpenTelemetry Collector.

BYOC APM maps these core OpenTelemetry span attributes to Datadog span fields:

- Service
- Operation name
- Resource name
- Span type
- Status and error

### Organization setup

In a Datadog organization that uses BYOC APM:

- All traces are stored in BYOC, in one traces database cluster. You can't use SaaS APM and BYOC APM in the same organization.
- Logs can be stored in Datadog or in [BYOC Logs][1].

## Requirements

To use BYOC APM, you need:

- An AWS account and an Amazon EKS cluster
- A platform team that can operate the data plane, including the installation and operation of the [Datadog Operator][2]
- A budget for the compute and object storage that the data plane uses
- A Datadog organization for the APM UI and metrics
- Applications instrumented with [OpenTelemetry][9] that send traces over OTLP through the OpenTelemetry Collector

The Preview supports only Amazon EKS. Other cloud providers and on-premises deployment aren't supported.

The BYOC APM installation is similar to the BYOC Logs installation. For prerequisites, such as minimum versions and the cloud resources to create, see [Install BYOC Logs on Amazon EKS][10].

## Preview capabilities

The following table lists the capabilities that BYOC APM supports and doesn't support in the Preview:

| Area | Supported | Not supported |
| --- | --- | --- |
| Ingestion | OTLP trace ingestion and span storage in your cloud account | Datadog Agent ingestion, pipeline customization |
| Search and analytics | Historical span queries | Trace queries, Live Search, some aggregations, the scatter plot, calculated fields, cluster selection in [Trace Explorer][11] |
| Metrics | RED metrics: request rate, errors, and latency | Sorting by error rate, percentiles, the distribution widget, [custom metrics generated from spans][12] |
| Services | [Service pages][5], [resource pages][6], [Catalog][7] entries | The service dependency graph, service remapping configuration, [Error Tracking][15] |
| Monitors | [Monitors on trace metrics][8] | Some monitor types |
| Logs | [Logs and traces correlation][13], using the trace ID on each log | |
| AI agents | [Datadog MCP Server][14] tools that search spans, get a trace, and summarize a trace | |
| Span data | | Span links, span events, enrichments |
| Data management | | Retention filters, Sensitive Data Scanner |

Datadog hides some unsupported features in the UI.

## Responsibilities

You and Datadog share responsibility for a BYOC APM deployment. The data plane runs in your cloud account, so your team operates it and responds first when an issue occurs there. Datadog supplies the software that runs in the data plane, and runs the control plane and the APM UI.

| Owner | Responsibilities |
| --- | --- |
| You | Operate the data plane: the Kubernetes cluster, cloud infrastructure, and versioning. Use the Datadog Operator to automate deployment and upgrades. Pay for the compute and object storage that the data plane uses. |
| Datadog | Supplies the Datadog Operator and the ingestion pipeline. Runs the control plane and the APM UI. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /byoc-logs/
[2]: /containers/datadog_operator/
[3]: /observability_pipelines/
[4]: /tracing/metrics/
[5]: /tracing/services/service_page/
[6]: /tracing/services/resource_page/
[7]: /internal_developer_portal/catalog/
[8]: /monitors/types/apm/
[9]: /opentelemetry/
[10]: /byoc-logs/install/aws_eks/#prerequisites
[11]: /tracing/trace_explorer/
[12]: /tracing/trace_pipeline/generate_metrics/
[13]: /tracing/other_telemetry/connect_logs_and_traces/
[14]: /mcp_server/
[15]: /tracing/error_tracking/
