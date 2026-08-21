---
title: Sample Processor
description: "Learn how to use the Sample processor to keep a representative subset of logs or traces and drop the rest at a defined rate."
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- name: Traces
  icon: apm
  url: /observability_pipelines/configuration/?tab=traces#pipeline-types
---

{{< product-availability >}}

## Overview

This processor samples your logs or {{< tooltip text="traces" tooltip="Contact your account manager to request access." >}} for a representative subset at the rate that you define, dropping the remaining events. As an example, you can use this processor to sample 20% of events from a noisy non-critical service.

The sampling only applies to events that match your filter query and does not impact other events. If an event is dropped at this processor, the event is not sent to subsequent processors.

## Setup

To set up the sample processor:
1. Define a {{< ui >}}filter query{{< /ui >}}. See [Logs Search Syntax][1] or [APM Query Syntax][2] for more information.
    - Only events that match the specified filter query are sampled at the specified retention rate.
    - The sampled events and the events that do not match the filter query are sent to the next step in the pipeline.
1. Enter your desired sampling rate in the {{< ui >}}Retain{{< /ui >}} field. For example, entering `2` means 2% of events are retained out of all events that match the filter query.
1. Optionally, enter a {{< ui >}}Group By{{< /ui >}} field to create separate sampling groups for each unique value for that field. For example, `status:error` and `status:info` are two unique field values. Each bucket of events with the same field is sampled independently. Click {{< ui >}}Add Field{{< /ui >}} if you want to add more fields to partition by. See the [group-by example](#group-by-example).

### Group-by example

If you have the following setup for the sample processor:
- Filter query: `env:staging`
- Retain: `40%` of matching events
- Group by: `status` and `service`

{{< img src="observability_pipelines/processors/group-by-example-service.png" alt="The sample processor with example values" style="width:40%;" >}}

Then, 40% of events for each unique combination of `status` and `service` from `env:staging` is retained. For example:

- 40% of events with `status:info` and `service:networks` are retained.
- 40% of events with `status:info` and `service:core-web` are retained.
- 40% of events with `status:error` and `service:networks` are retained.
- 40% of events with `status:error` and `service:core-web` are retained.

[1]: /observability_pipelines/search_syntax/logs/
[2]: /tracing/trace_explorer/query_syntax/
