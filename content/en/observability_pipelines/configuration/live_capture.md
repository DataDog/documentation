---
title: Live Capture
disable_toc: false
aliases:
  - /observability_pipelines/live_capture/
further_reading:
- link: "/observability_pipelines/configuration/set_up_pipelines/"
  tag: "Documentation"
  text: "Set up pipelines"
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- name: Metrics
  icon: metrics
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
---

{{< product-availability >}}

## Overview

Use Live Capture to see the data a source sends through the pipeline and also the data a processor receives and sends out.
Specifically, the following information is shown:
- The timestamp of when the data was received
- The data that was sent out and whether it was:
    - Modified
    - Unmodified
    - Dropped
    - Reduced

An example of Live Capture showing the log's `message` field before and after it has been processed by the Parse XML processor.

{{< img src="observability_pipelines/processors/live-capture-example.png" alt="The entry column shows the original message field's values and the exit column shows the values parsed as XML" style="width:100%;" >}}

## Permissions

Only users with the `Observability Pipelines Live Capture Write` permission can set up captures. Users with the `Observability Pipelines Live Capture Read` permission can only view the events that have already been captured. See [Observability Pipelines Permissions][1] for a list of permissions for Observability Pipelines assets.

Admins have read and write permissions by default. Standard users only have read permission by default. See [Access Control][2] for more information about default Datadog roles and how to create custom roles.

### Add domains to firewall allowlist

If you want to use Live Capture and are using a firewall, you must add these domains to the allowlist:

- `api.{{< region-param key="dd_site" >}}`
- `obpipeline-intake.{{< region-param key="dd_site" >}}`
- `config.{{< region-param key="dd_site" >}}`

## Capture events

1. Navigate to [Observability Pipelines][3].
1. Select your pipeline.
1. Click the cog for the source or processor that you want to capture events for.
1. Select **Capture and view events** in the side panel.
1. Click **Capture**.
1. **Optional configurations** (in Preview):
  {{< img src="observability_pipelines/live_capture_optional_config.png" alt="The Live Capture optional configuration modal showing the filter query, capture duration, and Worker selection options" style="width:60%;" >}}
  **Note**: Optional configurations are only available if all active Workers are version 2.13 or later.
    1. Enter a query to specify which events you want to capture. For more information, see [Search Syntax for Logs][4] or [Search Syntax for Metrics][5].
    1. Enter a capture duration (in seconds or minutes) for how long you want events to be captured.
        - Minimum duration (default if no duration is specified): 30 seconds
        - Maximum duration: 300 seconds (5 minutes)
    1. Select which Workers you want to capture events from. If no Workers are selected, a random Worker is chosen.
1. Click **Capture** to start capturing events.<br>**Note**: It might take up to 60 seconds for captured events to appear in the UI. Captured data is visible to all users with view access, and is stored in the Datadog Platform for 72 hours.
1. After the capture is complete:
    1. Click a specific captured event to see the data that was received and sent out. You can also search for specific events in the search bar. Use the dropdown menu next to the search bar to show events based on status (`MODIFIED`, `UNMODIFIED`, `DROPPED`, and `REDUCED`).
    1. In the **Workers - Capture Execution Details** section, click **View Logs** to see the Worker logs for the capture.
1. To see other captures for the same component, click **Captures** on the top left of the side panel. **Note**: Viewing other captures only applies if all active Workers are version 2.13 or later.
   - You can filter captures by capture event ID, filter query, pipeline version, or status (`in_progress` or `completed`).
   - For the **Total Events** column, the maximum captured events per Worker is 200 when including both the input and output of an event.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/#observability-pipelines
[2]: /account_management/rbac/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /observability_pipelines/search_syntax/logs
[5]: /observability_pipelines/search_syntax/metrics
