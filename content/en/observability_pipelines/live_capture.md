---
title: Live Capture
disable_toc: false
further_reading:
- link: "/observability_pipelines/set_up_pipelines/"
  tag: "Documentation"
  text: "Set up pipelines"
---

{{< beta-callout url="" header="false" btn_hidden="true">}}
Live Capture is in Preview.
{{< /beta-callout >}}

## Overview

Use Live Capture to see the data a source sends through the pipeline and also the data a processor receives and sends out.
Specifically, the following information is shown:
- The timestamp of when the data was received
- The data that was sent out and whether it was:
    - Modified
    - Unmodified
    - Dropped
    - Reduced

## Capture events

1. Navigate to [Observability Pipelines][1].
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

[1]: https://app.datadoghq.com/observability-pipelines

