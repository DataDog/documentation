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

<!-- TODO: Confirm the final product name with the PM (BYOC APM, BYOC for APM, or Datadog BYOC for APM). -->
<!-- TODO: Confirm site availability with the PM. BYOC Logs is available on all sites except GovCloud. -->

{{< callout url="#" btn_hidden="true" header="BYOC APM is in Preview" >}}
BYOC APM is in Preview. Installation goes through the Datadog design-partner program.
{{< /callout >}}
<!-- TODO: Confirm how customers request access (Preview form URL, account team, or design-partner program) and the public wording for the program. -->

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
| [Datadog Operator][2] | Your Kubernetes cluster | Deploys and upgrades the data plane. BYOC Logs and BYOC APM use the same operator. |
| OpenTelemetry Collector | Your environment | Sends traces and trace metrics over OTLP. |
| Processing worker | Your cloud account | Runs the ingestion pipeline that Datadog builds. You can't customize this pipeline. |
| Traces database cluster | Your cloud account | Stores spans. Object storage backs this cluster. The cluster is dedicated to traces and is separate from BYOC Logs clusters. |
| Metrics, trace metrics, and profiles | Datadog | Stores metrics, trace metrics, and profiles. |
| APM UI and control plane | Datadog | Supplies the APM experience and queries the span data in your cloud account. |

<!-- TODO: Confirm with the PM whether the docs can name Observability Pipelines and the BYOC Traces and Trace Metrics destinations. -->
<!-- TODO: Describe the processing that the ingestion pipeline applies to spans, after the PM approves the wording. -->

### Data flows

BYOC APM moves data along these paths:

- **Spans**: Your application, instrumented with an OpenTelemetry SDK, sends spans to the OpenTelemetry Collector over OTLP. The Collector sends the spans to the processing worker, which writes them to the traces database cluster in your cloud account.
- **Trace metrics**: Trace metrics go to Datadog without processing, so they stay aligned with the spans in your cloud account. Trace metrics power [service pages][3], [resource pages][4], [Catalog][5] entries, and [monitors on trace metrics][6].
- **Queries**: The APM UI in Datadog queries the traces database cluster in your cloud account. Query results display in Datadog.

<!-- TODO: Confirm with the PM whether the docs can say that sampling happens in the SDK or the Collector, and that only core OpenTelemetry span attributes are mapped. -->

### Data in Datadog

This data stays in Datadog:

- The APM UI and control plane
- Metrics and [trace metrics][7], including RED metrics (request rate, errors, and latency)
- Profiles
- The display of query results

## Preview capabilities

<!-- TODO: Confirm the supported and unsupported lists with the PM before publication. -->

BYOC APM supports these capabilities in the Preview:

- OTLP trace ingestion and span storage in your cloud account
- Historical span queries
- RED metrics: request rate, errors, and latency
- [Service pages][3] and [resource pages][4]
- [Catalog][5] entries
- [Monitors on trace metrics][6]

BYOC APM doesn't support these capabilities in the Preview:

- Trace queries and Live Search
- Some aggregations, and the scatter plot
- Cluster selection. [Trace Explorer][8] and the service page read from one traces database cluster.
- The service dependency graph
- Span links and span events
- Pipeline customization
- Datadog Agent ingestion
- Percentiles
- Retention filters
- Sensitive Data Scanner
- Span-to-metrics
- Service remapping configuration
- Enrichments
- The distribution widget
- Some monitor types
- Calculated fields

The Datadog UI hides features that BYOC APM doesn't support.

<!-- TODO: Confirm with the PM whether logs-to-traces correlation is supported in the Preview, and whether it needs setup, such as trace_id injection into logs. -->

## Requirements

To use BYOC APM, you need:

- An AWS account and an Amazon EKS cluster
- A platform team that can operate the data plane, including the installation and operation of the [Datadog Operator][2]
- A budget for the compute and object storage that the data plane uses
- A Datadog organization for the APM UI and metrics
- Applications instrumented with [OpenTelemetry][9] that send traces over OTLP through the OpenTelemetry Collector

<!-- TODO: Confirm with the PM whether the Datadog Operator is required, or is one of two installation options. -->
<!-- TODO: Confirm requirement details with the PM: minimum Datadog Operator version, EKS and Kubernetes versions, object storage type, and sizing. -->

The Preview supports Amazon EKS only. It doesn't support:

- Datadog Agent ingestion
- Other cloud providers
- On-premises deployment

## Responsibilities

| Owner | Responsibilities |
| --- | --- |
| You | Operate the data plane: Kubernetes, cloud infrastructure, deployment, upgrades, and versioning. You are the first to respond when an issue occurs in the data plane. |
| Datadog Operator | Automates data plane deployment and upgrades. |
| Datadog | Runs the APM UI and supplies the ingestion pipeline. |

<!-- TODO: Confirm with the PM whether APM health dashboards, monitors, and runbooks exist for the Preview, and whether there are APM-specific network or data-boundary details. -->

## Get access

BYOC APM installation goes through the Datadog design-partner program. Self-service installation isn't available for the Preview.

<!-- TODO: Add the access mechanism (form URL, account team, or design-partner program) after the PM confirms it. -->
<!-- TODO: Confirm with the PM whether any public install content exists for the Preview, and whether the docs can link to the BYOC Logs Datadog Operator install docs. -->

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /byoc-logs/
[2]: /containers/datadog_operator/
[3]: /tracing/services/service_page/
[4]: /tracing/services/resource_page/
[5]: /internal_developer_portal/catalog/
[6]: /monitors/types/apm/
[7]: /tracing/metrics/
[8]: /tracing/trace_explorer/
[9]: /opentelemetry/
