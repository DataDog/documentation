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
Installation goes through the Datadog design-partner program.
{{< /callout >}}

## Overview

BYOC (Bring Your Own Cloud) APM runs APM span ingestion, processing, and storage in your own cloud account. You investigate those spans in the Datadog APM UI.

With BYOC APM, you control the infrastructure and the location of your trace data. You use Datadog to search spans, explore services, and monitor application performance.

BYOC APM extends the BYOC offering for logs. For more information, see [BYOC Logs][1].

## Use cases

BYOC APM supports these use cases:

- **Tracing at scale**: If cost limits your tracing coverage or retention, run span processing and storage on your own cloud infrastructure. BYOC APM uses object storage as the durable data layer. You can apply your existing cloud provider commitments to this infrastructure.
- **Data residency and control**: Store trace data in your own cloud account or in a geography that you approve. Use this option when regulations, company policy, or the sensitivity of an application require it.

<div class="alert alert-info">BYOC APM keeps span storage in your cloud account, but some data goes to Datadog. Query results display in Datadog, and metrics and profiles stay in Datadog. Include these data flows in a data residency review, in addition to span storage.</div>

## How it works

BYOC APM has two parts:

- **Data plane**: Runs in your cloud account. It ingests, processes, and stores spans.
- **Control plane and APM UI**: Run in Datadog. The APM UI sends queries to the span storage in your cloud account.

### Components

| Component | Location | Function |
| --- | --- | --- |
| [Datadog Operator][2] | Your Kubernetes cluster | Deploys and upgrades the data plane. |
| OpenTelemetry Collector | Your environment | Sends traces and trace metrics over the OpenTelemetry Protocol (OTLP). |
| Processing worker | Your cloud account | Runs a prebuilt ingestion pipeline from Datadog. You can't customize this pipeline. |
| Traces database cluster | Your cloud account | Stores spans in object storage. The cluster is dedicated to traces and is separate from BYOC Logs clusters. |
| Metrics, trace metrics, and profiles | Datadog | Receives trace metrics without processing, and stores metrics and profiles. |
| APM UI and control plane | Datadog | Shows the APM UI and queries the span data in your cloud account. |

### Data flows

BYOC APM moves data along these paths:

- **Spans**: Your application, instrumented with an OpenTelemetry SDK, sends spans to the OpenTelemetry Collector over OTLP. The Collector sends the spans to the processing worker, which writes them to the traces database cluster in your cloud account.
- **Trace metrics**: [Trace metrics][3], including RED metrics (request rate, errors, and latency), go to Datadog without processing. As a result, they stay aligned with the spans in your cloud account. Trace metrics supply the data for [service pages][4], [resource pages][5], [Catalog][6] entries, and [monitors on trace metrics][7].
- **Queries**: The APM UI in Datadog queries the traces database cluster in your cloud account. Query results display in Datadog.

## Preview capabilities

BYOC APM supports these capabilities in the Preview:

- OTLP trace ingestion and span storage in your cloud account
- Historical span queries
- RED metrics: request rate, errors, and latency
- [Service pages][4] and [resource pages][5]
- [Catalog][6] entries
- [Monitors on trace metrics][7]

BYOC APM doesn't support these capabilities in the Preview:

- Trace queries and Live Search
- Some aggregations and the scatter plot
- Cluster selection in [Trace Explorer][8]
- The service dependency graph
- Span links and span events
- Pipeline customization
- Datadog Agent ingestion
- Percentiles
- Retention filters
- Sensitive Data Scanner
- [Custom metrics generated from spans][9]
- Service remapping configuration
- Enrichments
- The distribution widget
- Some monitor types
- Calculated fields

Datadog hides some unsupported features in the UI.

## Requirements

To use BYOC APM, you need:

- An AWS account and an Amazon EKS cluster
- A platform team that can operate the data plane, including the installation and operation of the [Datadog Operator][2]
- A budget for the compute and object storage that the data plane uses
- A Datadog organization for the APM UI and metrics
- Applications instrumented with [OpenTelemetry][10] that send traces over OTLP through the OpenTelemetry Collector

The Preview supports Amazon EKS only. Other cloud providers and on-premises deployment aren't supported.

## Responsibilities

| Owner | Responsibilities |
| --- | --- |
| You | Operate the data plane: Kubernetes, cloud infrastructure, deployment, upgrades, and versioning. You are the first to respond when an issue occurs in the data plane. |
| Datadog Operator | Automates data plane deployment and upgrades. |
| Datadog | Runs the APM UI and supplies the ingestion pipeline. |

## Get access

BYOC APM installation goes through the Datadog design-partner program. Self-service installation isn't available for the Preview.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /byoc-logs/
[2]: /containers/datadog_operator/
[3]: /tracing/metrics/
[4]: /tracing/services/service_page/
[5]: /tracing/services/resource_page/
[6]: /internal_developer_portal/catalog/
[7]: /monitors/types/apm/
[8]: /tracing/trace_explorer/
[9]: /tracing/trace_pipeline/generate_metrics/
[10]: /opentelemetry/
