---
title: Watchdog
kind: Documentation
description: Automatically detect potential application and infrastructure issues
further_reading:
- link: "tracing/setup/"
  tag: "Documentation"
  text: Learn how to setup APM tracing with your application
- link: "tracing/visualization/services_list/"
  tag: "Documentation"
  text: Discover the list of services reporting to Datadog
- link: "tracing/visualization/service"
  tag: "Documentation"
  text: Learn more about services in Datadog
- link: "tracing/visualization/resource"
  tag: "Documentation"
  text: Dive into your resource performance and traces
- link: "tracing/visualization/trace"
  tag: "Documentation"
  text: Understand how to read a Datadog Trace
---

{{< vimeo 278057125 >}}

## Overview

Watchdog is an algorithmic feature that automatically detects potential application and infrastructure issues. Watchdog observes trends and patterns in application metrics — like error rate, request rate, and latency — and unexpected behavior. Watchdog evaluates all services and resources without the need to configure a monitor for each service.

Watchdog looks for irregularities in metrics, like a sudden spike in hit rate. For each irregularity, the [Watchdog page][1] displays a Watchdog story. Each story includes a graph of the detected metric irregularity and gives more information about the relevant timeframe and endpoint or endpoints. 

Stories can be filtered by environment and availability zone, as well as by the type of service or resource. Typing in the “Filter stories” search box also allows user to filter stories by service or resource name.


{{< img src="tracing/watchdog/watchdog_overview.png" alt="Watchdog overview" responsive="true" popup="true">}}

Clicking on the Story shows further details about requests, errors, and latency at the time of the detected irregularity. 

{{< img src="tracing/watchdog/watchdog_story.png" alt="Watchdog story" responsive="true" popup="true">}}

Selecting *Show expected bounds* in the corner reveals upper and lower thresholds of expected behavior on the graph.

{{< img src="tracing/watchdog/watchdog_expected_values.png" alt="Watchdog expected value" responsive="true" popup="true">}}

## Watchdog in the Services List

When an irregularity in a metric is detected, the yellow Watchdog binoculars icon appears next to the affected service in the [APM Services List][2]. The number next to the binoculars indicates the number of issues Watchdog has noticed within that service.

{{< img src="tracing/watchdog/service_list.png" alt="Watchdog service list" responsive="true" popup="true">}}

If Watchdog has discovered something out of the ordinary in a specific service, viewing the corresponding [Service page][2] reveals a dedicated Watchdog section in the middle of the page, between the application performance graphs and the latency distribution section. The Watchdog section displays any relevant Watchdog Stories.

{{< img src="tracing/watchdog/watchdog_story_bis.png" alt="Watchdog story bis" responsive="true" popup="true">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/watchdog
[2]: /tracing/visualization/services_list/