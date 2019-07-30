---
title: Trace Analytics Monitors
kind: documentation
description: "Analytics on your APM data at infinite cardinality"
aliases:
  - /monitors/monitor_types/trace_search/
further_reading:
- link: "tracing/setup/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "tracing/visualization/services_list/"
  tag: "Documentation"
  text: "Discover the list of services reporting to Datadog"
- link: "tracing/visualization/service"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "tracing/visualization/resource"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
- link: "tracing/visualization/trace"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
- link: "tracing/trace_search_and_analytics/search"
  tag: "Documentation"
  text: "Global search of all your traces with tags"
---
## Overview 

Trace Search & Analytics enables you to search, filter, and aggregate APM data based on the APM events running through your system and based on tags that you create. Trace Analytics monitoring allows you to set up custom monitors based on this data. Use these monitors to visualize the data over time and to set up alerts based on APM events - for example, if there is a spike in slow requests or anything else you can use APM events to track.

## Creating a Trace Analytics Monitor

1. To [create a new monitor][1], hover over **Monitors** in the main menu and click **New Monitor** in the sub-menu. To create a monitor programmatically, see the [Datadog API][2] or [community maintained libraries][3].
2. On the new monitor page, select **APM** monitor.
3. Select *Trace Analytics* and then define your [trace search query][4]:
    {{< img src="monitors/monitor_types/trace_search/trace_search.png" alt="Trace search monitor" responsive="true" style="width:75%;" >}}
4. Set your alert conditions.
5. Name and describe your monitor.
6. Configure your **notification options**:
    See the [Notifications][5] page for detailed options.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#/create
[2]: /api/#monitors
[3]: /developers/libraries/#managing-monitors
[4]: /tracing/trace_search_and_analytics/search
[5]: /monitors/notifications
