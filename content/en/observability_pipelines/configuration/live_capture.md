---
title: Live Capture
disable_toc: false
aliases:
  - /observability_pipelines/live_capture/
further_reading:
- link: "/observability_pipelines/configuration/set_up_pipelines/"
  tag: "Documentation"
  text: "Set up pipelines"
---

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

## Capture events

1. Navigate to [Observability Pipelines][3].
1. Select your pipeline.
1. Click the cog for the source or processor that you want to capture events for.
1. Select **Capture and view events** in the side panel.
1. Click **Capture**.
1. Click **Confirm** to start capturing events.<br>**Note**: Capturing events usually takes up to 60 seconds. Captured data is visible to all users with view access, and is stored in the Datadog Platform for 72 hours.
1. After the capture is complete, click a specific capture event to see the data that was received and sent out. You can also search for specific events in the search bar. Use the dropdown menu next to the search bar to show events based on status (`MODIFIED`, `UNMODIFIED`, `DROPPED`, and `REDUCED`).
    - **Capture N** is the capture request number. For example, Capture N is `1` for the first capture and `6` for the sixth capture.
    - Data highlighted in red indicates data that was modified or dropped.
    - Data highlighted in green indicates data that was added.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/#observability-pipelines
[2]: /account_management/rbac/
[3]: https://app.datadoghq.com/observability-pipelines
