---
title: Trace Panel
kind: documentation
description: 'View the full trace related to a span, detailed span attributes and tags, service metrics and much more.'
further_reading:
    - link: 'tracing/trace_explorer/'
      tag: 'Documentation'
      text: 'Trace Explorer'
---

## Overview

Clicking on any span from the [list view][1] opens the Trace side panel:

{{< img src="tracing/trace_explorer/trace_panel/trace_panel.png" alt="Trace side panel" style="width:70%;">}}

- The upper part of the panel displays **Trace Context** information
- The lower part of the panel displays **Span Content**

### Trace Context

The **Trace Context** includes :
- Information about the entrypoint of the request: **service**, **resource**, **http method**, **start date**.
- Trace **duration**: The duration of the trace is simply the duration of the root span.
- **[Trace Visualization](#trace-visualizations)**: by default, the trace is displayed as a [Flame Graph](#flame-graph). However, other visualization types are available: [Span List][2], [Trace Map](#trace-map), [Waterfall View](#waterfall-view)

### Span Content

The **Span Content** section includes information related to the span object selected in the Trace Explorer. This comprises all span tags information, collected out-of-the-box thanks to integrations, or manually added to the spans with [custom instrumentation][3] in Tracing Libraries.

Some standard fields, for instance `duration`, `service`, `operation.name` or `resource` have specific enhanced displays in the Trace Panel for better readability.

{{< img src="tracing/trace_explorer/trace_panel/reserved_span_tags.png" alt="Reserved span tags" style="width:90%;">}}

**Note:** When a span is indexed by tag-based [retention filters][4], the full trace context is kept along with the span object. It guarantees the access to the Trace Visualisations when you open the Trace panel from the [Trace Explorer Indexed Search][5].


## Trace visualizations

### Flame Graph

The flame graph represents the full request over time with all distributed calls across services. Each trace contains one or more spans. Each rectangle represents a span.

A span represents a logical unit of work in the system for a given time period. Each span consists of a `span.name`, start time, duration, and span tags. For example, a span can describe the time spent on a distributed call on a separate machine.

In the example below, the span `rack.request` is the entry-point span of the trace. The example also shows the tags added application side (`merchant.store_name`, `merchant.tier`, etc) belonging to the span. The flame graph shows the full request: `web-store` service then calls other downstream services (authentication service, payment service, databases).

{{< img src="tracing/trace_explorer/trace_panel/trace_flamegraph.png" alt="Flame Graph" style="width:100%;" >}}

### Span List

### Trace Map

### Waterfall view

<div class="alert alert-warning">
The waterfall view is currently in private beta. Contact <a href="http://localhost:1313/help/">Datadog Support</a> to request access.
</div>

## Hub to other data sources

### Infrastructure Data

[To complete]

### Service and resource level metrics

[To complete]

### Connect Traces and Profiles

[To complete]

### Connect Traces and Logs

[To complete]

### Connect Traces and Network Flows

[To complete]

### Conntect Traces and Processes

[To complete]

[1]: /tracing/trace_explorer/visualize/#list-view
[2]: span-list
[3]: /tracing/setup_overview/custom_instrumentation/java/
[4]: /tracing/trace_retention/#retention-filters
[5]: /tracing/trace_explorer/#indexed-spans-search-with-15-day-retention
