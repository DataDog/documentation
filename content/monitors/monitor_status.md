---
title: Monitor Status
kind: documentation
description: "Get an overview of your monitor status over time"
further_reading:
- link: "monitors/monitor_types"
  tag: "Documentation"
  text: "Learn how to create a monitor"
- link: "monitors/notifications"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "monitors/downtimes"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
---

{{< img src="monitors/monitor_status/monitor_status_page.png" alt="monitor status page" responsive="true" >}}

## Overview

Once you have [created your monitor][1], the Monitor Status page gives you a bird's eye view of your monitor status over time.
This page is split in 3 main sections:

* **[Properties](#properties)**
* **[Status and History](#status-and-history)**
* **[Events](#events)**

These sections are open by default, and can be closed by using the little `>` icon to the left of the section name.

### Monitor status options
Some options are available in the upper right corner of the page:

* **Mute a monitor**:
    Choose to mute a monitor directly on its status page. Use the *Scope* field to narrow your downtime.
    Refer to the [dedicated downtime documentation][2] to learn how to mute multiple scopes or multiple monitors at the same time.

    NOTE: muting or unmuting a monitor via the UI deletes all scheduled downtimes associated with that monitor.

    {{< img src="monitors/monitor_status/status_mute_monitor.png" alt="status mute monitor" responsive="true" style="width:30%;">}}

* **Resolve a monitor**:
    Resolve your monitor manually.

* **Configuration options**:
  Use the *cog* icon to display options available:
    * [Edit][1]
    * Clone
    * [Export][3]
    * Delete

## Properties

{{< img src="monitors/monitor_status/status_monitor_properties.png" alt="status monitor properties" responsive="true" style="width:80%;" >}}

The *Properties* section is the overview of your monitor:

- The status of your monitor
- The monitor creator
- The monitor ID ([for the monitor API][4])
- Tags attached to your monitor. *Edit the tag list by clicking on the pencil icon*.
- The monitor [query][5]
- The monitor message

Use the *cog* icon in the upper right corner of the page to [edit][1] your monitor properties.

## Status and History

The *Status and History* section reflect the query and state changes over time, while the **Evaluation Graph** represents the exact query behavior within the timeframe bracket *on the history graph*. The Evaluation Graph has a fixed zoomed window that corresponds to your monitor evaluation timesteps, to ensure the displayed points are not [incorrectly aggregated][6]. Slide this bracket over the timeline in order to view previous monitor evaluation results:

{{< img src="monitors/monitor_status/status_monitor_history.gif" alt="status monitor history" responsive="true" style="width:80%;" >}}

To deep dive into your metrics evolution for further investigation, we advise you to use the [Metric Explorer page][7] or a dedicated [Notebook][8]

## Events

All events generated from your monitor are aggregated in this section. Those events are also displayed in your [event stream][9].

{{< img src="monitors/monitor_status/status_monitor_event.png" alt="status monitor event" responsive="true" style="width:80%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/monitor_types
[2]: /monitors/downtimes
[3]: /monitors/#export-your-monitor
[4]: /api/?lang=python#monitors
[5]: /graphing/functions
[6]: /videos/datadog101-5-aggregation/?wtime=49s
[7]: https://app.datadoghq.com/metric/explorer
[8]: /graphing/notebooks
[9]: /graphing/event_stream
