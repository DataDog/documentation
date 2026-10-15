---
title: Integration Pipelines Processor
description: Use Datadog's out-of-the-box integration log pipelines in Observability Pipelines to parse and normalize logs before sending them to your destinations.
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

The processor supports only the static, out-of-the-box integration pipelines included with the Worker. The Worker's catalog of integration pipelines updates only through new Worker releases.

{{< img src="observability_pipelines/processors/integration_pipelines.png" alt="The Manage Integration Pipelines panel listing enabled integration pipelines with their source filters and processor counts." style="width:100%;" >}}

<div class="alert alert-warning">Datadog does not recommend using this processor when sending logs to the Datadog Logs destination. Processing logs both in the Worker and in Datadog duplicates work and could produce conflicting results. Datadog Log Management's integration pipelines update automatically and more frequently than the Worker's catalog. The Datadog Logs destination could also reverse some of the processor's parsing and normalization.</div>

**Notes**:
- Datadog strongly recommends using this processor to parse and normalize logs when sending logs to Datadog Archive destinations.
- Enabling an integration pipeline does not mean the Worker sends all logs through it. The `source` or `ddsource` log field, such as `source:nginx`, determines whether a log matches an integration pipeline. Ensure your logs have one of those fields.
    - Datadog Agent logs sent to the Worker already have `ddsource` added.
- Integration pipelines do not support the GeoIP processor.
- The processor does not run custom pipelines created in Log Management or modified versions of integration pipelines in Log Management.
- All available integration pipelines are enabled by default. However, new integration pipelines added to the catalog in subsequent Worker releases are **not** automatically enabled for existing Integration Pipelines processors. You must enable them manually.

## Setup

To set up an Integration Pipelines processor:

1. Define a filter query to select the logs that enter the processor. See [Search Syntax][1] for more information.
    - Only matching logs are normalized and processed.
    - All logs, regardless of whether they match the filter query, are sent to the next step in the pipeline.
1. (Optional) Click {{< ui >}}Normalization & Preprocessing{{< /ui >}} to configure the reserved-field mappings the Worker uses for common normalization. See [Common normalization](#common-normalization) and [Preprocessing options](#preprocessing-options) for more information.
1. Click {{< ui >}}Edit Pipelines{{< /ui >}} to view a list of integration pipelines that have been enabled or disabled.
1. In the {{< ui >}}Manage Integration Pipelines{{< /ui >}} panel, enable or disable integration pipelines. When the {{< ui >}}Enabled{{< /ui >}} button is selected, the list shows all enabled integration pipelines.
    {{< img src="observability_pipelines/processors/integration_pipelines_enabled_disabled.png" alt="Manage Integration Pipelines panel with the Enabled and Disabled toggle highlighted." style="width:100%;" >}}
    - To enable integration pipelines:
      1. Click {{< ui >}}Disabled{{< /ui >}} to see the list of disabled pipelines.
      1. Select the checkboxes for the pipelines you want to enable.
      1. Click {{< ui >}}Enable Selected{{< /ui >}}.
    - To disable integration pipelines:
      1. Click {{< ui >}}Enabled{{< /ui >}} to see the list of enabled pipelines.
      1. Select the checkboxes for the pipelines you want to disable.
      1. Click {{< ui >}}Disable Selected{{< /ui >}}.
1. Click {{< ui >}}Save{{< /ui >}}.
1. If you enabled or disabled integration pipelines, you must redeploy the pipeline for the changes to take effect.

## CPU sizing

The Integration Pipelines processor is CPU intensive. Use **10,000 events per second per vCPU** as a conservative starting estimate, then size Workers using sample logs and enabled pipelines.

CPU usage depends on:

- The proportion of logs that match an enabled integration pipeline.
- The amount of processing required by the integration pipeline. For example, Grok, User-Agent, and URL parsers typically require more processing than remappers.
- The processing overhead of normalizing every log that matches the processor's filter, including logs without a matching integration pipeline.

Enabling more integration pipelines does not necessarily increase per-event processing overhead because the Worker routes each log based on its `source` or `ddsource` field. It does not send logs through all enabled integration pipelines. Use the processor's filter to target specific logs when appropriate, and allow CPU headroom for traffic spikes.

## How the processor works

For every log that matches the processor's filter:

1. The Worker normalizes and preprocesses the log, whether or not it matches an integration pipeline. See [Common normalization](#common-normalization) and [Preprocessing options](#preprocessing-options) for more information.
1. The Worker uses the normalized log's `source` to match it to an integration pipeline, such as `source:nginx` for the NGINX pipeline.
1. The integration pipeline parses, remaps, and enriches the log. Logs that don't match a pipeline skip this step.
1. The Worker groups attributes that aren't [reserved attributes](/logs/log_configuration/attributes_naming_convention/#reserved-attributes) under `attributes`.

### Common normalization

The Worker normalizes every log that matches the processor's filter, even if the log doesn't match an integration pipeline. The normalization process:

- Parses JSON objects in `message` and extracts their fields. For example, a message containing `{"message":"request complete","http.status_code":200}` becomes a message of `request complete` with an extracted HTTP status code.
- Expands dotted keys into nested objects. For example, `"http.status_code": 200` becomes `"http": {"status_code": 200}`, stored under `attributes` in the output.
- Maps log fields to reserved fields such as `timestamp`, `host`, `service`, `message`, `status`, `trace_id`, and `span_id`. For example, `hostname` can populate `host`, and `level` can populate `status`. See [Preprocessing options](#preprocessing-options) for more information.
- Resolves the log's source, including from `ddsource`, before selecting an integration pipeline.

### Preprocessing options

Preprocessing maps log attributes to reserved attributes. Each reserved attribute has an ordered list of log attributes to check, and the Worker uses the value of the first matching attribute in the list. You can add more log attributes to each list in the {{< ui >}}Normalization & Preprocessing{{< /ui >}} settings.

For example, if you add `custom_host` before `hostname` in the list for the reserved attribute `host`, the Worker checks for `custom_host` first. Clearing a list disables remapping for that reserved attribute.

**Note**: If `status` is unset, it defaults to `info`, even when the list for `status` is empty.

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

The processor also emits the following metrics for each integration pipeline. Each metric is tagged with `integration_id`, such as `integration_id:apache` or `integration_id:nginx`:

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

The integration pipeline metrics count only logs that match an enabled integration pipeline. Changes made only by common normalization do not count as integration pipeline modifications. To identify the integrations processing the most logs, group by `integration_id` and compare the number of ingested and modified events. The `pipeline_id` tag identifies the overall Observability Pipelines pipeline, not an integration pipeline.

[1]: /observability_pipelines/search_syntax/logs/
[2]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[3]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[4]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
