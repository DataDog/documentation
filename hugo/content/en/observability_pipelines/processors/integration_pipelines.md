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

The Integration Pipelines processor brings Datadog's out-of-the-box log processing pipelines to Observability Pipelines. Use it to parse and normalize logs from integrations, such as Apache and NGINX, on your own infrastructure before sending them to a destination.

The processor supports only the static, out-of-the-box integration pipelines included with the Worker. It does not run custom pipelines or edited copies of Datadog integration pipelines. The integration pipeline catalog ships with the Worker and is updated through new Worker releases. Upgrade your Workers to receive catalog updates; the catalog does not update automatically.

Datadog recommends using this processor with archive destinations to store parsed and normalized logs.

<div class="alert alert-warning">Datadog does not recommend using this processor before a Datadog Logs destination. Processing logs both in the Worker and in Datadog duplicates work and can produce conflicting results. Datadog's hosted integration pipelines update automatically and more frequently than the Worker's catalog. The Datadog Logs destination also reverses some of the processor's parsing and normalization.</div>

## How processing works

For every log that matches the processor's filter:

1. A common normalization layer parses and prepares the log, regardless of whether it matches an integration pipeline.
2. The processor uses the normalized log's `source` to select an enabled integration pipeline. For example, `source:nginx` selects the NGINX pipeline if it is enabled.
3. The integration pipeline applies its processors to parse, remap, and enrich the log. Logs without a matching enabled pipeline skip this step.
4. The log continues to the next step in the Observability Pipelines pipeline, with non-reserved fields grouped under `attributes`.

### Common normalization

Normalization runs even when no integration pipeline matches. As a result, these logs can still change. The normalization layer:

- Parses JSON objects in `message` and extracts their fields. For example, a message containing `{"message":"request complete","http.status_code":200}` becomes a message of `request complete` with an extracted HTTP status code.
- Expands dotted keys into nested objects. For example, `"http.status_code": 200` becomes `"http": {"status_code": 200}`, stored under `attributes` in the output.
- Maps log fields to reserved fields such as `timestamp`, `host`, `service`, `message`, `status`, `trace_id`, and `span_id`. For example, `hostname` can populate `host`, and `level` can populate `status`.
- Resolves the log's source, including from `ddsource`, before selecting an integration pipeline.

This follows the reserved-field approach described in [Datadog log preprocessing][1]. Configure preprocessing on this processor to change its field mappings.

## Setup

1. Add an Integration Pipelines processor to your [Observability Pipelines pipeline][2], before an archive destination.
2. Define a filter query to select the logs that enter the processor. Only matching logs are normalized and processed. All logs continue to the next step. See [Search Syntax][3] for query syntax.
3. When you add the processor in the UI, all integration pipelines in the current catalog are enabled by default. Use the checkboxes to selectively enable or disable pipelines. After a Worker upgrade, integrations newly added to the catalog are not automatically enabled for existing processors. They appear in the processor's {{< ui >}}Disabled{{< /ui >}} section; add them to the {{< ui >}}Enabled{{< /ui >}} section and deploy the new configuration to include them.
4. Ensure your logs identify their integration through `source` or `ddsource`, such as `nginx`. Logs collected by the Datadog Agent with an integration log configuration already have their source set. Enabling a pipeline does not apply it to every log: the normalized source must match that pipeline.
5. Optionally, configure the reserved-field mappings in `preprocessing`. Omit this configuration to use the defaults described below.
6. Validate the output with representative logs, including logs that do not match an enabled integration pipeline. Check downstream processors and destinations that use fields now nested under `attributes`.
7. Deploy the pipeline and monitor Worker CPU usage and the processor's [health metrics](#health-metrics).

{{< img src="observability_pipelines/processors/integration_pipelines.png" alt="Manage Integration Pipelines panel showing the catalog version, pipeline search, Enabled and Disabled sections, and a table of integration names, source filters, and processor counts." style="width:100%;" >}}

### Preprocessing options

Each option is an ordered list of candidate field paths. The first matching candidate supplies the reserved field. Paths refer to the incoming log's attributes; do not add the output's `attributes` prefix.

| Option | Reserved field | Default candidates, in order |
| --- | --- | --- |
| `date_sources` | `timestamp` | `@timestamp`, `timestamp`, `_timestamp`, `Timestamp`, `eventTime`, `date`, `published_date`, `syslog.timestamp` |
| `hostname_sources` | `host` | `host`, `hostname`, `syslog.hostname` |
| `message_sources` | `message` | `message`, `msg`, `log` |
| `service_sources` | `service` | `service`, `syslog.appname`, `dd.service` |
| `status_sources` | `status` | `status`, `severity`, `level`, `syslog.severity` |
| `trace_id_sources` | `trace_id` | `dd.trace_id`, `contextMap.dd.trace_id`, `named_tags.dd.trace_id`, `trace_id` |
| `span_id_sources` | `span_id` | `dd.span_id`, `contextMap.dd.span_id`, `named_tags.dd.span_id`, `span_id` |

Setting a candidate list replaces that field's default list. For example, `hostname_sources: ["custom_host", "hostname"]` checks `custom_host` before `hostname`. Omitted options keep their defaults. An empty list disables promotion for that field, except that an unset `status` still defaults to `info`.

## CPU sizing

This processor is CPU intensive. Use **10,000 events per second per vCPU** as a conservative starting estimate, then size Workers using representative logs and enabled pipelines.

CPU usage depends on:

- The proportion of logs that match an enabled integration pipeline.
- The number and cost of processors in the integration pipelines that handle most of your logs.
- The baseline normalization cost, paid for every log entering the processor, including logs without a matching integration pipeline.

The number of enabled integration pipelines does not determine per-event processing cost: each log is dispatched by its source, rather than tested against every enabled pipeline. Use the processor's filter to limit incoming logs when appropriate, and allow CPU headroom for traffic spikes.

## Health metrics

For [component metrics][4] and [processor buffer metrics][5] emitted by all processors, see [Pipelines Usage Metrics][6]. To filter or group by this processor, use `component_type:integration_pipelines`.

The processor also emits four metrics for each integration pipeline, tagged with `integration_id`, such as `apache` or `nginx`:

| Metric | Description |
| --- | --- |
| `pipelines.integration_pipelines_ingested_events_total` | Number of events dispatched to the integration pipeline, whether or not it modifies them. |
| `pipelines.integration_pipelines_ingested_event_bytes_total` | Estimated JSON size, in bytes, of events dispatched to the integration pipeline. |
| `pipelines.integration_pipelines_modified_events_total` | Number of events modified by the integration pipeline. |
| `pipelines.integration_pipelines_modified_event_bytes_total` | Estimated JSON size, in bytes, of events modified by the integration pipeline. |

Both byte metrics use the event size after normalization and before the integration pipeline runs. The modified byte metric measures the volume of events modified, rather than the number of bytes changed or the output size.

Logs without a matching enabled integration pipeline do not contribute to these four metrics. Changes made only by common normalization do not count as integration pipeline modifications. Group by `integration_id` to identify the busiest integrations and compare processed events with modified events. The `pipeline_id` tag identifies the overall Observability Pipelines pipeline, rather than an integration.

[1]: /logs/log_configuration/pipelines/#preprocessing
[2]: /observability_pipelines/configuration/set_up_pipelines/
[3]: /observability_pipelines/search_syntax/logs/
[4]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[5]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[6]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
