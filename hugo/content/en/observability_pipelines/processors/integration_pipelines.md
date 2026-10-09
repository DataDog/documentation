---
title: Integration Pipelines Processor
description: Use Datadog's out-of-the-box integration log pipelines in Observability Pipelines to parse and normalize logs before archiving them.
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
The Integration Pipelines processor is in Preview. Contact your account manager to request access.
{{< /callout >}}

## Overview

The Integration Pipelines processor brings Datadog's out-of-the-box log processing pipelines to Observability Pipelines. Use it to parse and normalize logs from integrations, such as Apache and NGINX, before sending them to your destinations.

The processor only supports static, out-of-the-box integration pipelines included with the Worker. It does not run custom pipelines or edited copies of Datadog integration pipelines. The integration pipeline catalog is included with the Worker and updated through new Worker releases. Because the catalog does not update automatically, you must upgrade your Worker for catalog updates and manually enable the new integration pipelines.

{{< img src="observability_pipelines/processors/integration_pipelines.png" alt="Manage Integration Pipelines panel showing the catalog version, pipeline search, Enabled and Disabled sections, and a table of integration names, source filters, and processor counts." style="width:100%;" >}}

**Notes**:
- Datadog strongly recommends using this processor to parse and normalize logs when sending logs to Datadog Archive destinations.
- Enabling an integration pipeline does not mean the Worker sends all logs through it. The `source` or `ddsource` log field, such as `source:nginx`, determines whether a log matches an integration pipeline. Ensure your logs have one of those fields.
- Logs sent by the Datadog Agent with an integration log configuration already have their source set.
- Integration pipelines do not support the GeoIP processor.

## Setup

<div class="alert alert-warning">Datadog does not recommend using this processor when sending logs to the Datadog Logs destination. Processing logs both in the Worker and in Datadog duplicates work and could produce conflicting results. Datadog Log Management's integration pipelines update automatically and more frequently than the Worker's catalog. The Datadog Logs destination could also reverse some of the processor's parsing and normalization.</div>

To set up an Integration Pipelines processor:

1. Define a filter query to select the logs that enter the processor. See [Search Syntax][1] for more information.
    - Only matching logs are normalized and processed.
    - All logs, regardless of whether they match the filter query, are sent to the next step in the pipeline.
1. (Optional) Click {{< ui >}}Normalization & Preprocessing{{< /ui >}} to configure the reserved-field mappings the Worker uses for common normalization. See [Common normalization](#common-normalization) and [Preprocessing options](#preprocessing-options) for more information.
1. Click {{< ui >}}Edit Pipelines{{< /ui >}} to view a list of integration pipelines that have been enabled or disabled.
1. The {{< ui >}}Manage Integration Pipelines{{< /ui >}} panel shows a list of enabled integration pipelines. Click {{< ui >}}Disabled{{< /ui >}} to see integration pipelines that are disabled.
    - **Note**: All available integration pipelines are enabled by default. However, new integration pipelines added to the catalog in subsequent Worker releases are **not** automatically enabled for existing Integration Pipelines processors. You must enable them manually.
    - To enable integration pipelines:
      1. Click {{< ui >}}Disabled{{< /ui >}} to see the list of disabled pipelines.
      1. Check the boxes for pipelines you want to enable.
      1. Click {{< ui >}}Enable Selected{{< /ui >}}.
    - To disable integration pipelines:
      1. Click {{< ui >}}Enabled{{< /ui >}} to see the list of enabled pipelines.
      1. Check the boxes for pipelines you want to disable.
      1. Click {{< ui >}}Disable Selected{{< /ui >}}.
    {{< img src="observability_pipelines/processors/integration_pipelines_enabled_disabled.png" alt="Manage Integration Pipelines panel with the Enabled and Disabled toggle highlighted." style="width:100%;" >}}
1. Click {{< ui >}}Save{{< /ui >}}.

**Note**: When you enable or disable integrations, you must redeploy the pipeline for the changes to take effect.

## CPU sizing

This processor is CPU intensive. Use **10,000 events per second per vCPU** as a conservative starting estimate, then size Workers using sample logs and enabled pipelines.

CPU usage depends on:

- The proportion of logs that match an enabled integration pipeline.
- The number and cost of processors in the integration pipelines that handle most of your logs.
- The baseline normalization cost, paid for every log entering the processor, including logs without a matching integration pipeline.

The number of enabled integration pipelines does not determine per-event processing cost: each log is dispatched by its source, rather than tested against every enabled pipeline. Use the processor's filter to target specific logs when appropriate, and allow CPU headroom for traffic spikes.

## How the processor works

For every log that matches the processor's filter:

1. The Worker normalizes and preprocesses the log, whether or not it matches an integration pipeline. See [Common normalization](#common-normalization) and [Preprocessing options](#preprocessing-options) for more information.
1. The normalized log's `source` is used to match it to an integration pipeline, such as `source:nginx` for the NGINX pipeline.
1. The integration pipeline parses, remaps, and enriches the log. Logs that don't match a pipeline skip this step.
1. Non-[reserved](/logs/log_configuration/attributes_naming_convention/#reserved-attributes) fields are grouped under `attributes`.

### Common normalization

The Worker normalizes all logs even if they don't match an integration pipeline. The normalization process:

- Parses JSON objects in `message` and extracts their fields. For example, a message containing `{"message":"request complete","http.status_code":200}` becomes a message of `request complete` with an extracted HTTP status code.
- Expands dotted keys into nested objects. For example, `"http.status_code": 200` becomes `"http": {"status_code": 200}`, stored under `attributes` in the output.
- Maps log fields to reserved fields such as `timestamp`, `host`, `service`, `message`, `status`, `trace_id`, and `span_id`. For example, `hostname` can populate `host`, and `level` can populate `status`. See [Preprocessing options](#preprocessing-options) for more information.
- Resolves the log's source, including from `ddsource`, before selecting an integration pipeline.

### Preprocessing options

Preprocessing maps log attributes to reserved attributes. Each reserved attribute has an ordered list of log attributes to check. You can add more log attributes to the list. Preprocessing uses the value of the first matching attribute.

For example, if you add `custom_host` before `hostname` in the list for the reserved attribute `host`, the Worker checks for `custom_host` first. Clearing a list disables remapping for that reserved attribute.

**Notes**:
- If `status` is unset, it still defaults to `info`, even when the list is empty.
- Do not include the `attributes` prefix when adding an attribute to the list. For example, enter `log_timestamp` instead of `attributes.log_timestamp`.

| Reserved attribute | Default log attributes, in order                                                                                |
| ------------------ | --------------------------------------------------------------------------------------------------------------- |
| `timestamp`        | `@timestamp`, `timestamp`, `_timestamp`, `Timestamp`, `eventTime`, `date`, `published_date`, `syslog.timestamp` |
| `host`             | `host`, `hostname`, `syslog.hostname`                                                                           |
| `message`          | `message`, `msg`, `log`                                                                                         |
| `service`          | `service`, `syslog.appname`, `dd.service`                                                                       |
| `status`           | `status`, `severity`, `level`, `syslog.severity`                                                                |
| `trace_id`         | `dd.trace_id`, `contextMap.dd.trace_id`, `named_tags.dd.trace_id`, `trace_id`                                   |
| `span_id`          | `dd.span_id`, `contextMap.dd.span_id`, `named_tags.dd.span_id`, `span_id`                                       |

## Health metrics

For [component metrics][2] and [processor buffer metrics][3] emitted by all processors, see [Pipelines Usage Metrics][4]. To filter or group by this processor, use `component_type:integration_pipelines`.

The processor also emits four metrics for each integration pipeline, tagged with `integration_id`, such as `apache` or `nginx`:

Ingested events
: **Metric**: `pipelines.integration_pipelines_ingested_events_total`
: **Description**: Number of events sent to the integration pipeline, regardless of whether they are modified.

Ingested event bytes
: **Metric**: `pipelines.integration_pipelines_ingested_event_bytes_total`
: **Description**: Estimated JSON size, in bytes, of events sent to the integration pipeline. Event size is measured after normalization and before integration pipeline processing.

Modified events
: **Metric**: `pipelines.integration_pipelines_modified_events_total`
: **Description**: Number of events modified by the integration pipeline.

Modified event bytes
: **Metric**: `pipelines.integration_pipelines_modified_event_bytes_total`
: **Description**: Estimated JSON size, in bytes, of events modified by the integration pipeline. Event size is measured after normalization and before integration pipeline processing. This metric measures the total size of modified events, not the number of bytes changed or their size after processing.

These four metrics count only logs that match an enabled integration pipeline. Changes made only by common normalization do not count as integration pipeline modifications. To identify integrations processing the most logs, group by `integration_id` and compare the number of processed and modified events. The `pipeline_id` tag identifies the overall Observability Pipelines pipeline, not an integration pipeline.

[1]: /observability_pipelines/search_syntax/logs/
[2]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[3]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[4]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
