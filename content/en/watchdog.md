---
title: Watchdog
kind: Documentation
description: Automatically detect potential application and infrastructure issues
aliases:
  - /tracing/watchdog
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: "Collect your logs"
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: "Collect your processes"
- link: "tracing"
  tag: "Documentation"
  text: "Collect your traces"
---

{{< vimeo 278057125 >}}

## Overview

Watchdog is an algorithmic feature for APM that automatically detects potential application and infrastructure issues. Watchdog observes trends and patterns in application metrics—like error rate, request rate, and latency—and unexpected behavior. Watchdog evaluates all services and resources without the need to configure a monitor for each service.

Watchdog looks for irregularities in metrics, like a sudden spike in hit rate. For each irregularity, the [Watchdog page][1] displays a Watchdog story. Each story includes a graph of the detected metric irregularity and gives more information about the relevant timeframe and endpoint or endpoints. To avoid false alarms, Watchdog only reports issues after observing your data for a sufficient amount of time to establish a high degree of confidence.

Stories can be filtered by environment and availability zone, as well as by the type of service or resource. Typing in the "Filter stories" search box also allows user to filter stories by service or resource name.

{{< img src="watchdog/watchdog_overview_archive.png" alt="Watchdog overview" responsive="true" >}}

Clicking on the story shows further details about requests, errors, and latency at the time of the detected irregularity.

{{< img src="watchdog/watchdog_story.png" alt="Watchdog story" responsive="true" >}}

Selecting *Show expected bounds* in the corner reveals upper and lower thresholds of expected behavior on the graph.

{{< img src="watchdog/watchdog_expected_values.png" alt="Watchdog expected value" responsive="true" >}}

## Viewing Past Stories

{{< img src="watchdog/watchdog_datepicker.png" alt="Watchdog overview" responsive="true" >}}

Use the date picker in the upper right to view stories detected in a specific time range. You can view any story that happened in the last 13 months, going back to March 2019.

## Archiving Stories

{{< img src="watchdog/watchdog_archive.png" alt="Watchdog overview" responsive="true" >}}

Use the eye icon in the upper-right of a story to archive it. Archiving hides the story from the feed, as well as other places in the app, like the home page. If a story is archived, the yellow Watchdog binoculars icon does not show up next to the relevant service or resource.

To see archived stories, select the checkbox option to "Show N archived stories" in the top left. You can also see who archived each story and when, and restore archived stories to your feed.

Archiving does not prevent Watchdog from flagging future issues related to the service or resource.

## Using Facets

Facets are listed in the left panel. Use these to filter Watchdog stories by different categories (e.g. `service`, `availability zone`, etc.) and see the number of stories in each facet category.

{{< img src="watchdog/watchdog-facets2.png" alt="Watchdog facets" responsive="true" style="width:60%;">}}

## Watchdog in the Services List

When an irregularity in a metric is detected, the yellow Watchdog binoculars icon appears next to the affected service in the [APM Services List][2]. The number next to the binoculars indicates the number of issues Watchdog has noticed within that service.

{{< img src="watchdog/service_list.png" alt="Watchdog service list" responsive="true" >}}

If Watchdog has discovered something out of the ordinary in a specific service, viewing the corresponding [Service page][2] reveals a dedicated Watchdog section in the middle of the page, between the application performance graphs and the latency distribution section. The Watchdog section displays any relevant Watchdog Stories.

{{< img src="watchdog/watchdog_story_bis.png" alt="Watchdog story bis" responsive="true" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/watchdog
[2]: /tracing/visualization/services_list
