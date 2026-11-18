---
title: Integration Pipelines Processor
description: Use Datadog's out-of-the-box integration pipelines and custom pipelines in Observability Pipelines to parse and normalize logs before sending them to your destinations.
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

The Integration Pipelines processor brings Datadog's out-of-the-box log processing pipelines to Observability Pipelines. Use it to parse and normalize logs from integrations, such as Apache and NGINX, before sending them to your destinations. You can also import your custom Log Management pipelines to Observability Pipelines.

<div class="alert alert-warning">Datadog does not recommend using this processor when sending logs to the Datadog Logs destination. Processing logs both in the Worker and in Datadog duplicates work and could produce conflicting results. Datadog Log Management's integration pipelines update automatically and more frequently than the Worker's catalog. The Datadog Logs destination could also reverse some of the processor's parsing and normalization.</div>

The catalog of integration pipelines is updated through Worker releases. See [Update the integration pipelines catalog](#update-the-integration-pipelines-catalog) for more information.

For every log that matches the processor's filter:

1. The Worker normalizes and preprocesses the log, regardless of whether it matches an integration pipeline. You can configure preprocessing for your specific log attributes. See [Common normalization](#common-normalization) and [Preprocessing options](#preprocessing-options) for more information.
1. The Worker uses the normalized log's `source` to match it to an integration pipeline, such as `source:nginx` for the NGINX pipeline.
1. The integration pipeline parses, remaps, and enriches the log. Logs that don't match a pipeline skip this step.
1. Each enabled [custom pipeline](#custom-pipelines) processes the log if the log matches its filter.
1. The Worker groups attributes that aren't [reserved attributes](/logs/log_configuration/attributes_naming_convention/#reserved-attributes) under `attributes`.

{{< img src="observability_pipelines/processors/integration_pipelines_panel.png" alt="The Integration Pipelines tab of the Manage Integration Pipelines panel, listing enabled pipelines and their source filters." style="width:100%;" >}}

**Notes**:

- Datadog strongly recommends using this processor to parse and normalize logs when sending logs to Datadog Archives destinations.
- Enabling an integration pipeline does not mean the Worker sends all logs through it. The `source` or `ddsource` log attribute, such as `source:nginx`, determines whether a log matches an integration pipeline. Ensure your logs have one of those attributes.
    - Datadog Agent logs sent to the Worker already have `ddsource` added.
- Integration pipelines do not support the GeoIP processor.
- The integration pipelines catalog includes only the out-of-the-box pipelines bundled with the Worker. To import custom Log Management pipelines into Observability Pipelines, see [Custom pipelines](#custom-pipelines).

## Setup

To set up an Integration Pipelines processor:

1. Define a filter query to select the logs that enter the processor. See [Search Syntax][1] for more information.
    - Only matching logs are normalized and processed.
    - All logs, regardless of whether they match the filter query, are sent to the next step in the pipeline.
1. (Optional) Click {{< ui >}}Normalization & Preprocessing{{< /ui >}} to configure the reserved attribute mappings the Worker uses for preprocessing. See [Preprocessing options](#preprocessing-options) for more information.
1. Click {{< ui >}}Edit Pipelines{{< /ui >}} in the {{< ui >}}Integration Pipelines{{< /ui >}} row to view a list of integration pipelines that have been enabled or disabled.
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
1. (Optional) Click {{< ui >}}Edit Pipelines{{< /ui >}} in the {{< ui >}}Custom Pipelines{{< /ui >}} row to import and manage custom pipelines. See [Custom pipelines](#custom-pipelines) for more information.
1. Click {{< ui >}}Save{{< /ui >}}.
1. If you made changes to integration or custom pipelines, redeploy your Observability Pipelines pipeline for the changes to take effect.

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

## Custom pipelines

You can import custom pipelines created in [Log Management][3] into the Integration Pipelines processor to process your logs. The processor first matches logs to integration pipeline filters and then tries to match logs to custom pipeline filters.

Custom pipelines run in the order they are listed in the {{< ui >}}Custom Pipelines{{< /ui >}} tab, from top to bottom. Each log is processed by every enabled custom pipeline whose filter it matches, including logs previously processed by an integration pipeline.

**Note**: Custom pipelines require Worker version 2.25.0 or later. Upgrade all Workers in the pipeline before deploying custom pipelines.

<div class="alert alert-warning">The Worker does not support GeoIP parsers, Reference Table lookups, or threat intel processors. Importing a pipeline removes any unsupported processors from the imported copy. The import modal shows how many unsupported processors each pipeline has.</div>

### Import pipelines from Log Management

1. In the Integration Pipelines processor, click {{< ui >}}Edit Pipelines{{< /ui >}} in the {{< ui >}}Custom Pipelines{{< /ui >}} row.
1. Click {{< ui >}}Import Pipelines{{< /ui >}}.
1. In the {{< ui >}}Import Custom Pipelines{{< /ui >}} modal, select the Log Management pipelines you want to import. You can search pipelines by name, ID, or filter. The toggle for each pipeline reflects whether the pipeline is enabled or disabled in Log Management.
    {{< img src="observability_pipelines/processors/integration_pipelines_import_custom_pipelines.png" alt="The Import Custom Pipelines modal listing Log Management pipelines, with three pipelines selected for import." style="width:100%;" >}}
1. Click {{< ui >}}Import{{< /ui >}}.
1. Click {{< ui >}}Save{{< /ui >}}, then redeploy your log pipeline.

**Notes**:

- Importing a custom pipeline creates a copy in the processor. Later changes to the custom pipeline in Log Management are not synced. To apply the changes, import the custom pipeline again and redeploy your log pipeline.
- Deleting a custom pipeline from the processor does not affect the original pipeline in Log Management.
- An imported custom pipeline keeps its enabled or disabled state from Log Management.
- An imported custom pipeline keeps the ID it has in Log Management. Importing the same pipeline again overwrites the existing custom pipeline, including its name, filter, enabled state, and processors.
- A cloned custom pipeline is assigned a new ID, so importing the original pipeline again does not overwrite the clone.
- A custom pipeline without a filter in Log Management is assigned the `*` filter, which matches all logs.

### Manage custom pipelines

In the {{< ui >}}Custom Pipelines{{< /ui >}} tab, you can:

- Enable or disable custom pipelines. Use the {{< ui >}}Enabled{{< /ui >}} and {{< ui >}}Disabled{{< /ui >}} toggle to switch between the lists.
- Drag pipelines to change the order in which they run.
- Edit a pipeline's name and filter query. Processors can't be edited in Observability Pipelines. To change them, edit the pipeline in Log Management and import it again.
- Clone or delete a pipeline.

After making changes, click {{< ui >}}Save{{< /ui >}}, then redeploy your log pipeline for the changes to take effect.

{{< img src="observability_pipelines/processors/integration_pipelines_custom_pipelines_tab.png" alt="The Custom Pipelines tab listing two enabled custom pipelines with edit, disable, clone, delete, and reorder actions." style="width:100%;" >}}

## CPU sizing

The Integration Pipelines processor is CPU intensive. Use **10,000 events per second per virtual CPU (vCPU)** as a conservative starting estimate, then size Workers using sample logs and enabled pipelines.

CPU usage depends on:

- The proportion of logs that match an enabled integration pipeline.
- The amount of processing required by the integration pipeline. For example, Grok, User-Agent, and URL parsers typically require more processing than remappers.
- The processing overhead of normalizing every log that matches the processor's filter, including logs without a matching integration pipeline.

Enabling more integration pipelines does not necessarily increase per-event processing overhead because the Worker routes each log based on its `source` or `ddsource` attribute. It does not send logs through all enabled integration pipelines. Use the processor's filter to target specific logs when appropriate, and allow CPU headroom for traffic spikes.

## Common normalization

The Worker normalizes every log that matches the processor's filter, even if the log doesn't match an integration pipeline. The normalization process:

- Parses JSON objects in `message` and extracts their fields. For example, this log:
  ```json
  {
    "message": "{\"message\":\"request complete\",\"http.status_code\":200}"
  }
  ```
  is normalized to:
  ```json
  {
    "message": "request complete",
    "attributes": {
      "http": {
        "status_code": 200
      }
    }
  }
  ```
    In this example, the Worker:
    - Parses the JSON in `message`.
    - Expands the dotted key `http.status_code` into a nested object.
    - Moves the non-reserved `http` attribute under `attributes`.
- Maps log attributes to reserved attributes such as `timestamp`, `host`, `service`, `message`, `status`, `trace_id`, and `span_id`. For example, `hostname` can populate `host`, and `level` can populate `status`. See [Preprocessing options](#preprocessing-options) for more information.
- Resolves the log's source before selecting an integration pipeline.

## Update the integration pipelines catalog

The Worker's catalog of integration pipelines is updated only through new Worker releases. You must upgrade your Worker to receive catalog updates.

All available integration pipelines are enabled by default when you first add and deploy an Integration Pipelines processor. However, integration pipelines introduced in subsequent Worker releases are **not** automatically enabled for existing processors. You must enable them manually.

## Health metrics

See [Processor buffer metrics][2] for more information on metrics emitted by all processors. To filter or group by this processor, use `component_type:integration_pipelines`.

[1]: /observability_pipelines/search_syntax/logs/
[2]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/?tab=processors#buffer
[3]: /logs/log_configuration/pipelines/
