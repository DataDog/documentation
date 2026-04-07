---
title: APM
description: "Use the APM overlay in Cloudcraft to visualize distributed traces between cloud resources on your architecture diagrams."
further_reading:
- link: "/datadog_cloudcraft/overlays/infrastructure/"
  tag: "Documentation"
  text: "Infrastructure overlay"
- link: "/datadog_cloudcraft/overlays/observability/"
  tag: "Documentation"
  text: "Observability overlay"
- link: "/datadog_cloudcraft/overlays/security/"
  tag: "Documentation"
  text: "Security overlay"
- link: "/datadog_cloudcraft/overlays/ccm/"
  tag: "Documentation"
  text: "Cloud Cost Management overlay"
- link: "/tracing/"
  tag: "Documentation"
  text: "APM"
---

<div class="alert alert-info">The APM overlay is in Preview and is available for AWS accounts only.</div>

## Overview

The APM overlay displays distributed APM traces as arcs between cloud resources on your Cloudcraft diagram. This helps you understand service-to-service request flows across your infrastructure without leaving the architecture view.

To open the overlay, click the **APM** tab in the overlay selector at the top of your diagram.

### Supported resource types

The APM overlay shows connections for resources that include a Cloud Resource ID (CCRID) in their trace data. The following resource types are supported:

- EC2
- S3
- Lambda
- RDS

<!-- TODO: Screenshots needed. Reach out to Vesa Halttunen or the Cloudcraft team for assets showing:
1. The APM overlay with trace arcs on a diagram
2. The trace side panel -->

## Prerequisites

APM must be active in your Datadog organization, meaning at least one span has been ingested in the last 30 days. If APM is not set up, Cloudcraft displays an onboarding screen with links to [set up APM][1].

## Visualize trace connections

When the APM overlay is active, traces appear as curved arcs between resource nodes on your diagram. Each arc represents distributed tracing traffic between two resources.

### Legend

| Arc color | Status |
|-----------|--------|
| Green     | OK     |
| Red       | Error  |

Use the legend panel at the bottom of the screen to filter traces by status. The legend also displays the count of visible traces. Deselecting all statuses resets the view to show all traces.

## Investigate traces

Click a trace arc to open a side panel showing the list of APM traces between those two resources. The side panel includes:

- A **search bar** to filter traces by query.
- A **time picker** (defaults to the last 30 minutes).
- A **live mode** toggle for streaming trace data.
- A **column picker** to customize which fields are displayed. Default columns include Duration, Service, Resource Name, and Error Type.
- An **open in APM** link to view the same query in the [Traces Explorer][2].

Click a trace row in the side panel to open the trace detail view, which displays the standard APM flame graph.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/
[2]: /tracing/trace_explorer/
